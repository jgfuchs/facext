byid = (id) => document.getElementById(id);

window.onload = () => {
    var video = document.getElementById('video'),
        video_width = video.width,
        video_height = video.height,
        overlay = document.getElementById('overlay'),
        overlayCC =overlay.getContext('2d');

    navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(
        (stream) => {
            byid("ok").style.display = "block";
            byid("status").innerHTML = "You can now close this window.";

            video.src = window.URL.createObjectURL(stream);
            video.play();

            var ctrack = new clm.tracker();
            ctrack.init();

            ctrack.start(video);

            setInterval(() => {
                if (ctrack.getCurrentPosition()) {
                    alert("I see you");
                }
            }, 5000);

            function drawLoop() {
                window.requestAnimationFrame(drawLoop);
				overlayCC.clearRect(0, 0, video_width, video_height);
				if (ctrack.getCurrentPosition()) {
					ctrack.draw(overlay);
				}
            }

            drawLoop();
        }
    ).catch(
        (err) => {
            byid("error").style.display = "block";
            byid("status").innerHTML = "Caught " + err.name;
        }
    )
};
