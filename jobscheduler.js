var list_of_tasks = [];
function addTasks(tasks) {
  list_of_tasks.push(tasks);
  list_of_tasks.length === 1 && executeTaskOneByOne();
}

function executeTaskOneByOne() {
  list_of_tasks[0]().then(() => {
    list_of_tasks.shift();
    list_of_tasks.length > 0 && executeTaskOneByOne();
  });
}

function updateViewTime(key) {
  var current_date = getTodaysDate();
  const view_time = {};
  view_time[current_date] = {};
  view_time[current_date][key] = 1;
  return chrome.storage.local
    .get(["view_time"])
    .then((result) => {
      if (!result.view_time) {
        chrome.storage.local.set({ canChangePending: true });
        return chrome.storage.local.set({
          view_time: view_time,
        });
      } else {
        // handling local storage
        if (!result.view_time[current_date]) {
          result.view_time[current_date] = {};
        }
        result.view_time[current_date][key] = result.view_time[current_date][
          key
        ]
          ? result.view_time[current_date][key] + 1
          : 1;
        return chrome.storage.local.set({ view_time: { ...result.view_time } });
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
}

function sendMessageToTabs(messageObj, tabId) {
  chrome.tabs.sendMessage(tabId, { ...messageObj }, {}, function (response) {
    console.log("message sent");
  });
}

function setLimit(value, tabid) {
  chrome.storage.local.set({ tablimit: value }).then((result) => {
    sendMessageToTabs({ message: "newTabLimit", data: { value } }, tabid);
  });
}

function getTabCount() {
  return chrome.storage.local.get(["tablimit"]);
}

function getTodaysDate() {
  //date in ISO format
  return new Date().toISOString().split("T")[0];
}
