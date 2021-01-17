$(function () {
  $("#save").click(save_options);
  $("#add").click(add_row);
  restore_options();

  // Saves options to chrome.storage
  function save_options() {
    var num_rows = $(":text[id^='username']").length;
    var newSecretKeys = {};
    for (var i = 0; i < num_rows; i++) {
      if ($(`#username${i}`).val()) {
        newSecretKeys[$(`#username${i}`).val()] = $(`#key${i}`).val();
      }
    }
    chrome.storage.sync.set(
      {
        secretKeys: newSecretKeys,
      },
      function () {
        // Update status to let user know options were saved.
        var status = $("#status");
        status.text("Save successful!");
        setTimeout(function () {
          status.empty();
        }, 1000);
      }
    );
  }

  function restore_options() {
    chrome.storage.sync.get(
      {
        secretKeys: {},
      },
      function ({ secretKeys }) {
        keysDiv = $("#keys");
        keysDiv.empty();
        var i = 0;
        Object.keys(secretKeys).forEach((username) => {
          if (!username) return;
          keysDiv.append(
            `Conversation ID: <input id="username${i}" type="text" placeholder="Enter a conversation ID" value="${username}"/>&nbsp;&nbsp;
          Secret Passphrase: <input id="key${i}" type="text" placeholder="Enter a secret passphrase" value="${secretKeys[username]}"/><br/>`
          );
          i++;
        });
        if (i === 0) add_row();
      }
    );
  }

  function add_row() {
    var num_rows = $(":text[id^='username']").length;
    $("#keys").append(
      `Conversation ID: <input id="username${num_rows}" type="text" placeholder="Enter a conversation ID"/>&nbsp;&nbsp;
  Secret Passphrase: <input id="key${num_rows}" type="text" placeholder="Enter a secret passphrase"/><br/>`
    );
  }
});
