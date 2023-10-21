document.getElementById("showcontentbutton").addEventListener("click", (e) => {
  chrome.storage.local.set({ canShowAppButton: e.currentTarget.checked });
  sendMessageToAllTabs("canShowAppButton", e.currentTarget.checked);
});

function sendMessageToAllTabs(message, data) {
  chrome.tabs.query({ currentWindow: true }, function (tabs) {
    for (var i = 0; i < tabs.length; i++) {
      chrome.tabs.sendMessage(tabs[i].id, {
        message: message,
        data: data,
      });
    }
  });
}

chrome.storage.local.get(["canShowAppButton"]).then((result) => {
  document.getElementById("showcontentbutton").checked =
    result.canShowAppButton;
});
