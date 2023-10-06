export function notifyBackgroundPage(message, data) {
  chrome.runtime.sendMessage({
    messages: message,
    data: data,
  });
}
