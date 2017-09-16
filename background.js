facext = {
    active: false,
    stream: null,
};

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);
    chrome.tabs.executeScript(null, {file: "toggle_play_pause.js"});
});

chrome.browserAction.onClicked.addListener(function(tab) {
  facext.active = !facext.active;

  if (facext.active) {
      chrome.browserAction.setIcon({path: "icon_active.png"});
      chrome.browserAction.setTitle({title: "Facext on, click to stop"});

      navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(
         (stream) => {
             facext.stream = stream;
             console.log("Success: ", stream);

             var video = document.createElement("video");
             video.setAttribute("width", "400");
             video.setAttribute("height", "300");
             video.setAttribute("preload", "auto");
             video.setAttribute("loop", "true");
             video.setAttribute("playsinline", "true");
             video.setAttribute("autoplay", "true");

            video.src = window.URL.createObjectURL(stream);
            video.play();

            console.log(video);

            var ctrack = new clm.tracker();
            ctrack.init();

            ctrack.start(video);

            console.log(ctrack);

            chrome.tabs.executeScript(null, {file: "toggle_play_pause.js"});

            // setInterval(() => {console.log(ctrack.getCurrentPosition());}, 1000);

         }
      ).catch(
         (err) => {
             console.log("Error: ", err);
         }
      )
  } else {
      chrome.browserAction.setIcon({path: "icon.png"});
      chrome.browserAction.setTitle({title: "Facext off, click to start"});

      if (facext.stream) {
          facext.stream.getVideoTracks()[0].stop();
      }
  }
});
