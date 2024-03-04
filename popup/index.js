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
  document.querySelector('.login').addEventListener('click', function() {
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      console.log( "AcessToken" , token);
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
          getUserInfo(accessToken)
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


  document.querySelector('.logout').addEventListener('click', function() {
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      console.log(token);
      var url = 'https://accounts.google.com/o/oauth2/revoke?token=' + token;
      window.fetch(url);
      chrome.identity.removeCachedAuthToken({token: token}, function (){
        alert('signed  out sucessfully');
      });
    })
  });


chrome.storage.local.get(["canShowAppButton"]).then((result) => {
  document.getElementById("showcontentbutton").checked =
    result.canShowAppButton;
});


function getUserInfo(accessToken) {
  const userInfoURL = 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json';
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  };
  const options = {
    method: 'GET',
    headers: headers
  };

  fetch(userInfoURL, options)
    .then(response => response.json())
    .then(userInfo => {
      console.log(userInfo);
    })
    .catch(error => {
      console.error('Error fetching userinfo:', error);
    });
}
