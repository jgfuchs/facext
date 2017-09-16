chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
    if (request == "play") {
        chrome.tabs.executeScript(null, {file: "play.js"});
    }
    else if (request == "pause") {
        chrome.tabs.executeScript(null, {file: "pause.js"});
    }
    else {
        console.log("Invalid request " + request);
    }
});
