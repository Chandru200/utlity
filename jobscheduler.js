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
  // console.log(check_websites.includes(key));
  var current_date = getTodaysDate();
  const view_time = {};
  view_time[current_date] = {};
  view_time[current_date][key] = 1;

  return chrome.storage.local
    .get([
      "view_time",
      "daily_tracking",
      "website_time_limit",
      "remaining_time",
    ])
    .then((result) => {
      if (!result.view_time) {
        chrome.storage.local.set({ canChangePending: true });
        return chrome.storage.local.set({
          daily_tracking: {},
          remaining_time: {},
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
        if (check_websites.includes(key)) {
          // handling for first time
          if (!result.daily_tracking[current_date]) {
            result.daily_tracking = {};
            result.daily_tracking[current_date] = {};
          }

          if (!result.remaining_time[current_date]) {
            result.remaining_time = {};
            result.remaining_time[current_date] = {};
          }

          result.remaining_time[current_date][key] =
            result.website_time_limit[key] -
            1 -
            result.daily_tracking[current_date][key];

          result.daily_tracking[current_date][key] = result.daily_tracking[
            current_date
          ][key]
            ? result.daily_tracking[current_date][key] + 1
            : 1;

          return chrome.storage.local.set({
            remaining_time: { ...result.remaining_time },
            daily_tracking: { ...result.daily_tracking },
            view_time: { ...result.view_time },
          });
        } else {
          return chrome.storage.local.set({
            view_time: { ...result.view_time },
          });
        }
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

chrome.storage.onChanged.addListener((changes, area) => {
  if (area == "local" && changes.website_time_limit) {
    sendMessageToAllTabs("setUpdatedWebLimit", {
      website_time_limit: changes.website_time_limit.newValue,
    });
  } else if (area == "local" && changes.remaining_time) {
    console.log(changes.remaining_time.newValue[getTodaysDate()][activeUrl]);
    if (changes.remaining_time.newValue[getTodaysDate()][activeUrl] <= 0) {
      removeURLfromAllTabs(activeUrl);
    }
  }
});

function removeURLfromAllTabs(url) {
  chrome.tabs.query({}, function (tabs) {
    let show_blocked = false;
    for (var i = 0; i < tabs.length; ++i) {
      if (new URL(tabs[i].url).host == url) {
        chrome.tabs.remove(tabs[i].id);
        if (!show_blocked) {
          chrome.tabs.create({
            url: "chrome-extension://heepebmhlkkpbpebdcfmnbpjgjbgloah/isolatedapps/blocked.html",
          });
        }
        show_blocked = true;
      }
    }
  });
}
