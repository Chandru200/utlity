importScripts("apiwrapper.js")
function sendMessageToTabs(messageObj, tabId) {
  chrome.tabs.sendMessage(
    tabId,
    { message: messageObj.message },
    {},
    function(response) {
      console.log("message sent");
    }
  );
}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("message:", request.messages);
  console.log("data",request.data);
  if (request.messages === "canShowApp") {
    getRequest("get_todos",
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
