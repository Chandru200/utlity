importScripts("apiwrapper.js");
function sendMessageToTabs(messageObj, tabId) {
  chrome.tabs.sendMessage(tabId, { ...messageObj }, {}, function (response) {
    console.log("message sent");
  });
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("message:", request.message);
  console.log("data", request.data);
  if (request.message === "canShowApp") {
    getRequest("get_todos", (response) => {
      sendMessageToTabs(
        {
          message: "canShowApp",
          data: response,
        },
        sender.tab.id
      );
    });
  } else if (request.message === "login") {
    postRequest(
      "login_user",
      request.data,
      (response) => {
        if (response.msg === "logged in") {
          getRequest("get_todos", (response) => {
            sendMessageToTabs(
              {
                message: "canShowApp",
                data: response,
              },
              sender.tab.id
            );
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
  }
});
