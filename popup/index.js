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
window.onload = function() {
  document.querySelector('button').addEventListener('click', function() {
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      console.log(token);
      let init = {
        method: 'GET',
        async: true,
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        'contentType': 'json'
      };
        fetch(
          'https://www.googleapis.com/calendar/v3/users/me/calendarList',
          init)
          .then((response) => response.json())
          .then(function(data) {

            console.log(data.items)
          });


          let accessToken = token;
          let calendarId = 'chandru20001@gmail.com';
          fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`, {
            headers: {
              Authorization: 'Bearer ' + accessToken,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data.items); 
            })
            .catch((error) => {
              console.error('Error fetching events:', error);
            });

          
    });
  });
};

chrome.storage.local.get(["canShowAppButton"]).then((result) => {
  document.getElementById("showcontentbutton").checked =
    result.canShowAppButton;
});
