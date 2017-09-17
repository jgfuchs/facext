window.onload = () => {
    chrome.storage.sync.get({
        display_emotions: false
    }, function(items) {
        var display_emotions = items.display_emotions;

        if (display_emotions) {
            var chart = document.getElementById('chart');

            chart.style.display = "inline";
            chart.style.width = "400px";
            chart.style.height = "300px";
        }
        else {
            var playpause = document.getElementById('playpause');

            playpause.style.display = "inline";
        }
        console.log(document.getElementById('chart'));
    });

    var video = document.getElementById('video'),
        face_detection_interval = 0.5,
        emotion_detection_interval = 2,
        face_present = false,
        emotion_classifier = new emotionClassifier(),
        emotion_names = Object.keys(emotionModel),
        datasets = [];

    emotion_names.sort();

    emotion_names.forEach((emotion) => {
        datasets.push({
            data: [0],
            label: emotion,
            borderColor: emotion_color_dict[emotion],
            fill: false
        });
    });

    var chart = new Chart(document.getElementById("chart"), {
            type: 'line',
            data: {
                labels: [0],
                datasets: datasets
            },
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            display: false
                        }
                    }]
                }
            }
        });

    function updateChart(emotion_data) {
        var emotion_array = [],
            next_label = chart.data.labels[chart.data.labels.length - 1] + emotion_detection_interval;

        emotion_names.forEach((emotion) => {
            emotion_array.push(emotion_data[emotion]);
        });

        chart.data.labels.push(next_label);

        for (var i = 0; i < chart.data.datasets.length; i++) {
            chart.data.datasets[i].data.push(emotion_array[i]);
        }

        chart.update();
    };

    emotion_classifier.init(emotionModel);

    navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(
        (stream) => {
            video.src = window.URL.createObjectURL(stream);
            video.play();

            var ctrack = new clm.tracker();
            ctrack.init();

            ctrack.start(video);

            // Toggle video if face appears or disappears
            setInterval(() => {
                current_position = ctrack.getCurrentPosition();

                face_present_old = face_present;
                face_present = (current_position != false);

                if (face_present != face_present_old) {
                	if (face_present) {
                        chrome.tabs.executeScript(null, {file: "play.js"});
                        document.getElementById('playpause').src = "icons/play.png";
                	}
                	else {
                        chrome.tabs.executeScript(null, {file: "pause.js"});
                        document.getElementById('playpause').src = "icons/pause.png";
                	}
                }
            }, 0.5 * face_detection_interval);

            // Emotion detection
            setInterval(() => {
                if (face_present) {
                    var current_parameters = ctrack.getCurrentParameters(),
                        emotions = emotion_classifier.meanPredict(current_parameters),
                        emotion_data = {};

                    if (emotions) {
                        emotions.forEach(function (emotion_dict) {
                            var emotion = emotion_dict['emotion'];

                            emotion_data[emotion] = emotion_dict['value'];
                        });

                        updateChart(emotion_data);
                    }
                }
            }, 1000 * emotion_detection_interval);
        }
    ).catch(
        (err) => {
        	console.log("Error loading video");
        }
    )
};
