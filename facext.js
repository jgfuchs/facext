window.onload = () => {
    var video = document.getElementById('video'),
        face_present = false;

    navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(
        (stream) => {
            video.src = window.URL.createObjectURL(stream);
            video.play();

            var ctrack = new clm.tracker();
            ctrack.init();

            ctrack.start(video);

            // Toggle video if face appears or disappears
            setInterval(() => {
                face_present_old = face_present;
                face_present = (ctrack.getCurrentPosition() != false);

                if (face_present != face_present_old) {
                	if (face_present) {
                    	chrome.extension.sendMessage("play");
                	}
                	else {
                		chrome.extension.sendMessage("pause");
                	}
                }
            }, 50);
        }
    ).catch(
        (err) => {
        	console.log("Error loading video")
        }
    )
};
