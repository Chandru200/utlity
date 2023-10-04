export function notifyBackgroundPage(message,data) {
    chrome.runtime.sendMessage({
        messages:message,
        data:data
    });
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("sent from tab.id=", sender.id);
        if (request.message === "canshowapp"){
            console.log("open app")
        }
        else{
            console.log("sign in to continue")
        }
    }
);
