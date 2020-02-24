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
        var textbox = document.querySelector("span[data-text='true']");
        var messageToSend = textbox.textContent;
        textbox.textContent =
          "FacebookCantTouchThis(" +
          CryptoJS.AES.encrypt(messageToSend, secretKey).toString() +
          ")";
        textbox.dispatchEvent(inputChangedEvent);
      }
    });
  }
);

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

  v = v.replace(/FacebookCantTouchThis\((.+\))/, (match, p1) =>
    CryptoJS.AES.decrypt(p1, secretKey).toString(CryptoJS.enc.Utf8)
  );

  if (textNode.nodeValue !== v) {
    textNode.nodeValue = v;
  }
}
