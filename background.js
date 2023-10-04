importScripts("apiwrapper.js")
function sendMessageToTabs(messageObj, tabId) {
  chrome.tabs.sendMessage(
    tabId,
    { message: messageObj.message },
    {}, // Options should be passed here
    function(response) {
      console.log("message sent");
    }
  );
}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("message:", request.messages);
  console.log("data",request.data);
  if (request.messages === "canShowApp") {
    getData();
    getRequest("getuser",
    (response)=>{
      sendMessageToTabs({ message: {
        message:"canShowApp",
        data: response
        } }, sender.tab.id);
      })
    }
  else if(request.messages === "login"){
    postRequest("login_user",request.data,(response)=>{
      if(response.msg === "logged in"){
        sendMessageToTabs({ message: {
          message:"canShowApp",
          data: response
          } }, sender.tab.id);
      }else{
        sendMessageToTabs({ message: {
          message:"login_error",
          data: response.msg
          } }, sender.tab.id);
      }
    },()=>{})
  }
  else if(request.messages === "register"){
    postRequest("register",request.data,(response)=>{
    if(response.error){
      sendMessageToTabs({ message: {
        message:"login_error",
        data: response.error
        } }, sender.tab.id);
    }else{
      sendMessageToTabs({ message: {
        message:"showsign",
        data: response
        } }, sender.tab.id);
      console.log(response)
    }
      
    },(error)=>{

      sendMessageToTabs({ message: {
        message:"login_error",
        data: error.error
        } }, sender.tab.id);
      console.log(error)
    })
  }
});

function login(){
  getRequest("login_user").then((data)=>{
    console.log(data)
  })
}

function logout(){
  getRequest(
    "logout",
    (response) => {
      console.log(response)
    },
    (error) => {
      console.log(error,"something went wrong")
    }
    )
}
function getData(){
  getRequest(
    "getuser",
    (response) => {
      console.log(response)
    },
    (error) => {
      console.log(error,"something went wrong")
    }
  )
}