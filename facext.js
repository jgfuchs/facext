window.onload = () => {
    var video = document.getElementById('video'),
        face_present = false,
        emotion_classifier = new emotionClassifier();

    emotion_classifier.init(emotionModel);
    console.log(emotion_classifier);

    navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(
        (stream) => {
            video.src = window.URL.createObjectURL(stream);
            video.play();

            var ctrack = new clm.tracker();
            ctrack.init();

            ctrack.start(video);

            setInterval(() => {
                current_position = ctrack.getCurrentPosition();

                face_present_old = face_present;
                face_present = (current_position != false);

                // Toggle video if face appears or disappears
                if (face_present != face_present_old) {
                	if (face_present) {
                        chrome.tabs.executeScript(null, {file: "play.js"});
                	}
                	else {
                        chrome.tabs.executeScript(null, {file: "pause.js"});
                	}
                }

                // Emotion detection
                if (face_present) {
                    var current_parameters = ctrack.getCurrentParameters(),
                        emotions = emotion_classifier.meanPredict(current_parameters);
                    
                    console.log(emotions);
                }
            }, 50);
        }
    ).catch(
        (err) => {
        	console.log("Error loading video");
        }
    )
};
