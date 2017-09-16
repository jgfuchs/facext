var facextActive = false;

chrome.browserAction.onClicked.addListener(function(tab) {
  facextActive = !facextActive;
  console.log(tab);
  if (facextActive) {
      chrome.browserAction.setIcon({path: "icon_active.png"});
  } else {
      chrome.browserAction.setIcon({path: "icon.png"});
  }
});
