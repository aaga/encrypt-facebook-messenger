var windowKey = null;
var secretKeys = {};
const inputChangedEvent = new Event("input", { bubbles: true });

chrome.storage.sync.get(
  {
    secretKeys: [],
  },
  function ({ secretKeys }) {
    console.log("encrypt-facebook-messenger: keys loaded");
    window.secretKeys = secretKeys;
    window.addEventListener(
      "keydown",
      (e) => {
        if (e.code === "Enter") {
          encryptMessage();
        }
      },
      true
    );
    setInterval(() => decryptMessages(), 100);
  }
);

function encryptMessage() {
  console.log("encrypt-facebook-messenger key: " + windowKey);

  if (!windowKey) return;

  // Convert each text "block"
  document
    .querySelectorAll("div[contenteditable='true'] span[data-text='true']")
    .forEach((elem) => {
      if (elem.innerText.includes("FacebookCantTouchThis")) return;
      elem.innerText =
        "FacebookCantTouchThis(" +
        CryptoJS.AES.encrypt(elem.innerText, windowKey).toString() +
        ")";
      elem.dispatchEvent(inputChangedEvent);
    });
}

function decryptMessages() {
  var username = window.location.toString().split("/").pop();
  windowKey = secretKeys.hasOwnProperty(username) ? secretKeys[username] : null;
  var divsToDecrypt = document.querySelectorAll("div[role='row']");
  divsToDecrypt.forEach((div) => {
    walk(div, windowKey);
  });
}

function walk(node, currKey) {
  // I stole this function from here:
  // http://is.gd/mwZp7E

  var child, next;

  var tagName = node.tagName ? node.tagName.toLowerCase() : "";
  if (tagName == "input" || tagName == "textarea") {
    return;
  }
  if (node.classList && node.classList.contains("ace_editor")) {
    return;
  }

  switch (node.nodeType) {
    case 1: // Element
      if (node.hasAttributes() && node.attributes.getNamedItem("data-href")) {
        var maybeUsername = node.attributes
          .getNamedItem("data-href")
          .value.split("/")
          .pop();
        if (secretKeys.hasOwnProperty(maybeUsername)) {
          currKey = secretKeys[maybeUsername];
        }
      }
    case 9: // Document
    case 11: // Document fragment
      child = node.firstChild;
      while (child) {
        next = child.nextSibling;
        walk(child, currKey);
        child = next;
      }
      break;

    case 3: // Text node
      handleText(node, currKey);
      break;
  }
}

function handleText(textNode, currKey) {
  var v = textNode.nodeValue;

  v = v.replace(
    /FacebookCantTouchThis\((.+\))/,
    (match, p1, offset, string) => {
      var toReturn = "";
      try {
        toReturn = CryptoJS.AES.decrypt(p1, currKey).toString(
          CryptoJS.enc.Utf8
        );
      } finally {
        return (
          toReturn || "[Unable to decrypt. Do you have the correct secret key?]"
        );
      }
    }
  );

  if (textNode.nodeValue !== v) {
    textNode.nodeValue = v;
  }
}
