function getRequest(url, sucessCallback, errorCallback, stopSync) {
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
        !stopSync && syncData();
      }
    })
    .catch((error) => {
      errorCallback(error);
    });
}

function postRequest(url, data, sucessCallback, errorCallback, stopSync) {
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
        !stopSync && syncData();
      }
    })
    .catch((error) => {
      errorCallback(error);
    });
}
function syncData() {
  chrome.storage.local.get(["view_time", "canChangePending"]).then((result) => {
    if (result.view_time && result.canChangePending) {
      chrome.storage.local
        .set({ pendingSyncData: result.view_time })
        .then(() => {
          chrome.storage.local.set({ canChangePending: false });
          chrome.storage.local.set({ view_time: {} });
          chrome.storage.local.get(["pendingSyncData"]).then((result) => {
            postRequest(
              "sync_viewed_time",
              { view_time: result.pendingSyncData },
              () => {
                chrome.storage.local.set({ pendingSyncData: {} });
                chrome.storage.local.set({ canChangePending: true });
              },
              (error) => {
                console.log("error");
              },
              true
            );
          });
        });
    } else if (!result.canChangePending) {
      chrome.storage.local.get(["pendingSyncData"]).then((result) => {
        postRequest(
          "sync_viewed_time",
          { view_time: result.pendingSyncData },
          () => {
            chrome.storage.local.set({ pendingSyncData: {} });
            chrome.storage.local.set({ canChangePending: true });
          },
          (error) => {
            console.log("error");
          },
          true
        );
      });
    }
  });
}
