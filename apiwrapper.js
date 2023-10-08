function getRequest(url, sucessCallback, errorCallback) {
  let fetchRes = fetch("http://127.0.0.1:8000/" + url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return fetchRes
    .then((res) => res.json())
    .then((response) => {
      if (
        response &&
        response.status == false &&
        response.msg === "authentication_error"
      ) {
        chrome.tabs.query({}, function (tabs) {
          for (var i = 0; i < tabs.length; ++i) {
            chrome.tabs.sendMessage(tabs[i].id, {
              message: "canShowApp",
              data: false,
            });
          }
        });
      } else {
        sucessCallback(response);
      }
    })
    .catch((error) => {
      errorCallback(error);
    });
}

function postRequest(url, data, sucessCallback, errorCallback) {
  let fetchRes = fetch("http://127.0.0.1:8000/" + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return fetchRes
    .then((res) => res.json())
    .then((response) => {
      if (
        response &&
        response.status == false &&
        response.msg === "authentication_error"
      ) {
        chrome.tabs.query({}, function (tabs) {
          for (var i = 0; i < tabs.length; ++i) {
            chrome.tabs.sendMessage(tabs[i].id, {
              message: "canShowApp",
              data: false,
            });
          }
        });
      } else {
        sucessCallback(response);
      }
    })
    .catch((error) => {
      errorCallback(error);
    });
}
