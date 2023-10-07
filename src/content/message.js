export function notifyBackgroundPage(message, data) {
  chrome.runtime.sendMessage({
    message: message,
    data: data,
  });
}
