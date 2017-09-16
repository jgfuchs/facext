window.onload = function () {
	/*********** Webcam setup *********/

	var video = document.getElementById('video');
	/*
	var vid_width = video.width;
	var vid_height = video.height;
	var overlay = document.getElementById('overlay');
	var overlayCC = overlay.getContext('2d');
	*/

	function webcamSuccess(stream) {
		video.src = window.URL.createObjectURL(stream);
		video.play();
	}

	function webcamFail(err) {
		console.log(err)
		alert("There was a problem fetching video from your webcam.")
	}

	// set up video
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	navigator.getUserMedia({video : true}, webcamSuccess, webcamFail);

	/*********** Code for face tracking *********/

	/*
	var ctrack = new clm.tracker();
	ctrack.init();
	var trackingStarted = false;

	function startVideo() {
		// start video
		video.play();
		// start tracking
		ctrack.start(video);
		trackingStarted = true;
		// start loop to draw face
		drawLoop();
	}

	function drawLoop() {
		requestAnimFrame(drawLoop);
		overlayCC.clearRect(0, 0, vid_width, vid_height);
		//psrElement.innerHTML = "score :" + ctrack.getScore().toFixed(4);
		if (ctrack.getCurrentPosition()) {
			ctrack.draw(overlay);
		}
	}
	*/
}
