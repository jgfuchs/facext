if (window.location.hostname == "www.youtube.com" && window.location.pathname == "/watch") {
  var playPauseButton = document.getElementsByClassName('ytp-play-button ytp-button');
  playPauseButton[0].click();
} else if (window.location.hostname == "www.netflix.com" && window.location.pathname.startsWith("/watch")) {
  var playPauseButton = document.getElementsByClassName('player-control-button player-play-pause');
  playPauseButton[0].click();
}