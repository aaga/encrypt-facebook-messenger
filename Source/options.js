// Saves options to chrome.storage
function save_options() {
  var secretKey1 = document.getElementById('key0').value;
  chrome.storage.sync.set({
    secretKeys: {default: secretKey1},
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    secretKeys: {default: ""}
  }, function(items) {
    document.getElementById('key0').value = items.secretKeys.default;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);