if (window.location.hostname == "www.youtube.com" && window.location.pathname == "/watch") {
  var playPauseButton = document.getElementsByClassName('ytp-play-button ytp-button')[0];
  if (playPauseButton.getAttribute('aria-label') == 'Pause') {
      playPauseButton.click();
  }
} else if (window.location.hostname == "www.netflix.com" && window.location.pathname.startsWith("/watch")) {
  var playPauseButton = document.getElementsByClassName('player-control-button player-play-pause pause')[0];
  playPauseButton.click();
}