importScripts("apiwrapper.js");
importScripts("jobscheduler.js");
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("message:", request.message);
  console.log("data", request.data);
  if (request.message === "canShowApp") {
    getRequest("get_todos", (response) => {
      getCurrentWindowTabs().then((tabs) => {
        response["tabs"] = tabs;
        chrome.storage.local.get(["tablimit"]).then((result) => {
          response["tablimit"] = result.tablimit;
          sendMessageToTabs(
            {
              message: "canShowApp",
              data: response,
            },
            sender.tab.id
          );
        });
      });
    });
  } else if (request.message === "login") {
    postRequest(
      "login_user",
      request.data,
      (response) => {
        if (response.msg === "logged in") {
          getRequest("get_todos", (response) => {
            getCurrentWindowTabs().then((tabs) => {
              response["tabs"] = tabs;
              chrome.storage.local.get(["tablimit"]).then((result) => {
                response["limit"] = result.limit;
                sendMessageToTabs(
                  {
                    message: "canShowApp",
                    data: response,
                  },
                  sender.tab.id
                );
              });
            });
          });
        } else {
          sendMessageToTabs(
            {
              message: "login_error",
              data: response.msg,
            },
            sender.tab.id
          );
        }
      },
      () => {}
    );
  } else if (request.message === "register") {
    postRequest(
      "register",
      request.data,
      (response) => {
        if (response.error) {
          sendMessageToTabs(
            {
              message: "login_error",
              data: response.error,
            },
            sender.tab.id
          );
        } else {
          sendMessageToTabs(
            {
              message: "showsign",
              data: response,
            },
            sender.tab.id
          );
        }
      },
      (error) => {
        sendMessageToTabs(
          {
            message: "login_error",
            data: error.error,
          },
          sender.tab.id
        );
        console.log(error);
      }
    );
  } else if (request.message === "createTodo") {
    const data = {
      name: request.data.name,
      description: request.data.description || "",
      due_date: request.data.duedate,
    };
    postRequest(
      "create_todo",
      data,
      (response) => {
        if (response.status) {
          sendMessageToTabs(
            {
              message: "todo_created",
              data: { id: response.id },
            },
            sender.tab.id
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  } else if (request.message === "editTodo") {
    const data = {
      id: request.data.id,
      name: request.data.name,
      description: request.data.description || "",
      due_date: request.data.duedate,
    };
    postRequest(
      "edit_todo",
      data,
      (response) => {
        if (response.status) {
          sendMessageToTabs(
            {
              message: "todo_edited",
              data: {},
            },
            sender.tab.id
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  } else if (request.message === "deleteTodo") {
    getRequest(
      `delete_todo?id=${request.data.id}`,
      (response) => {
        if (response.status) {
          sendMessageToTabs(
            {
              message: "todo_deleted",
              data: { id: request.data.id },
            },
            sender.tab.id
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  } else if (request.message === "closetab") {
    chrome.tabs.remove(request.data.id);
  } else if (request.message === "setLimit") {
    setLimit(request.data.limit, sender.tab.id);
  }
});

let activeTabId = null;
var activeUrl = "";
// Completely Tab Limitter
var tabCreated = false;
var blockTabId = "";
chrome.tabs.onCreated.addListener(function (tab) {
  getCurrentWindowTabs().then((tabs) => {
    //update all tabs
    getTabCount().then((result) => {
      if (tabs.length > result["tablimit"]) {
        if (
          !tabCreated &&
          tab.pendingUrl !==
            "chrome-extension://heepebmhlkkpbpebdcfmnbpjgjbgloah/isolatedapps/blocked.html"
        ) {
          chrome.tabs.remove(tab.id);
          chrome.tabs.create({
            url: "chrome-extension://heepebmhlkkpbpebdcfmnbpjgjbgloah/isolatedapps/blocked.html",
          });
        } else if (
          tab.pendingUrl ===
          "chrome-extension://heepebmhlkkpbpebdcfmnbpjgjbgloah/isolatedapps/blocked.html"
        ) {
          blockTabId = tab.id;
          tabCreated = true;
        } else {
          chrome.tabs.remove(tab.id);
        }
      } else {
        tabCreated = false;
        if (blockTabId) {
          chrome.tabs.remove(blockTabId);
          blockTabId = "";
        }
      }
    });
  });
});

function getCurrentWindowTabs() {
  return chrome.tabs.query({ currentWindow: true });
}
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

// Website Limitter

chrome.tabs.onActivated.addListener((activeInfo) => {
  activeTabId = activeInfo.tabId;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0].url) {
      activeUrl = new URL(tabs[0].url).hostname;
    }
  });
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  getCurrentWindowTabs().then((tabs) => {
    sendMessageToAllTabs("setUpdatedTabs", { tabs: tabs });
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId === activeTabId && changeInfo.url) {
    activeUrl = new URL(changeInfo.url).hostname;
  }

  getCurrentWindowTabs().then((tabs) => {
    sendMessageToAllTabs("setUpdatedTabs", { tabs: tabs });
  });
});
// setting all view-time
setInterval(() => {
  addTasks(() => {
    return updateViewTime(activeUrl);
  });
}, 1000);
