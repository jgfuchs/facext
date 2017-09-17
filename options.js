byid = (id) => document.getElementById(id);

function save_options() {
    var emotions = document.getElementById('emotions').checked;

    chrome.storage.sync.set({
        emotions: emotions
    });
}

function restore_options() {
    chrome.storage.sync.get({
        emotions: false
    }, function(items) {
        document.getElementById('emotions').checked = items.emotions;
    });
}

window.onload = () => {
    restore_options();
    document.getElementById('options').addEventListener('click', save_options);

    var video = document.getElementById('video'),
        video_width = video.width,
        video_height = video.height,
        overlay = document.getElementById('overlay'),
        overlayCC =overlay.getContext('2d'),
        face_present = false;

    navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(
        (stream) => {
            var status = document.getElementById("status");

            status.innerHTML = "OK";
            status.style.color = "green";

            video.src = window.URL.createObjectURL(stream);
            video.play();

            var ctrack = new clm.tracker();
            ctrack.init();

            ctrack.start(video);

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
            var status = document.getElementById("status"),
                error = document.getElementById("error");

            status.innerHTML = "ERROR";
            status.style.color = "red";
            error.innerHTML = "Caught " + err.name;
        }
    )
};
