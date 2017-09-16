facext = {
    active: false,
    stream: null,
};

chrome.browserAction.onClicked.addListener(function(tab) {
  facext.active = !facext.active;

  if (facext.active) {
      chrome.browserAction.setIcon({path: "icon_active.png"});
      chrome.browserAction.setTitle({title: "Facext on, click to stop"});

      navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(
         (stream) => {
             facext.stream = stream;
             console.log("Success: ", stream);
         }
      ).catch(
         (err) => {
             console.log("Error: ", err);
         }
      )
  } else {
      chrome.browserAction.setIcon({path: "icon.png"});
      chrome.browserAction.setTitle({title: "Facext off, click to start"});

      stream.getTracks()[0].stop();
  }
});
