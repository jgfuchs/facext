byid = (id) => document.getElementById(id);

window.onload = () => {
    var video = document.getElementById('video'),
        video_width = video.width,
        video_height = video.height,
        overlay = document.getElementById('overlay'),
        overlayCC =overlay.getContext('2d'),
        face_present = false;

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
                console.log("hello");
                console.log(ctrack.getCurrentPosition());

                face_present_old = face_present;
                face_present = (ctrack.getCurrentPosition() != false);

                if (face_present != face_present_old) {
                    console.log("toggle");
                    chrome.extension.sendMessage("toggle");
                }
            }, 1000);

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
