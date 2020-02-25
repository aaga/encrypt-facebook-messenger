var secretKey = "";
const inputChangedEvent = new Event("input", { bubbles: true });

chrome.storage.sync.get(
  {
    secretKeys: { default: "" }
  },
  function(items) {
    secretKey = items.secretKeys.default;
    setInterval(() => decryptMessages(), 100);
    document.addEventListener("keydown", e => {
      if (e.code === "Enter") {
        encryptMessage();
      }
    });
  }
);

function encryptMessage() {
  var textbox = document.querySelector("div[data-block='true']");
  var messageToSend = textbox.innerText;
  
  // Clear all text in text boxes
  var elems = [];
  document.querySelectorAll("span[data-text='true']").forEach(elem => {
    elems.push(elem);
  });
  elems.reverse().map(elem => {
    elem.innerText = "";
    elem.dispatchEvent(inputChangedEvent);
  });

  textbox.innerText =
    "FacebookCantTouchThis(" +
    CryptoJS.AES.encrypt(messageToSend, secretKey).toString() +
    ")";
  textbox.dispatchEvent(inputChangedEvent);
}

function decryptMessages() {
  var messagesDiv = document.querySelector("div[aria-label='Messages']");
  if (messagesDiv) {
    walk(messagesDiv);
  }

  var conversationsDiv = document.querySelector(
    "div[aria-label='Conversations']"
  );
  if (conversationsDiv) {
    walk(conversationsDiv);
  }
}

function walk(node) {
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
    case 9: // Document
    case 11: // Document fragment
      child = node.firstChild;
      while (child) {
        next = child.nextSibling;
        walk(child);
        child = next;
      }
      break;

    case 3: // Text node
      handleText(node);
      break;
  }
}

function handleText(textNode) {
  var v = textNode.nodeValue;

  v = v.replace(
    /FacebookCantTouchThis\((.+\))/,
    (match, p1, offset, string) => {
      var toReturn = "";
      try {
        toReturn = CryptoJS.AES.decrypt(p1, secretKey).toString(
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
