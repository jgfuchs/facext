window.onload = () => {
    var video = document.getElementById('video'),
        face_present = false,
        emotion_classifier = new emotionClassifier(),
        emotion_names = Object.keys(emotionModel),
        emotion_data = {};

    emotion_names.forEach((emotion) => {
        emotion_data[emotion] = [];
    });

    function drawChart(emotion_data) {
        var datasets = [],
            labels = [],
            i = 1;

        emotion_names.forEach((emotion) => {
            labels.push(i);
            datasets.push({
                data: emotion_data[emotion],
                label: emotion,
                borderColor: color_array[i],
                fill: false
            });
            i += 1;
        });

        console.log(datasets);
        console.log(labels);

        new Chart(document.getElementById("chart_div"), {
          type: 'line',
          /*
          data: {
            labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
            datasets: [{ 
                data: [86,114,106,106,107,111,133,221,783,2478],
                label: "Africa",
                borderColor: "#3e95cd",
                fill: false
              }, { 
                data: [282,350,411,502,635,809,947,1402,3700,5267],
                label: "Asia",
                borderColor: "#8e5ea2",
                fill: false
              }, { 
                data: [168,170,178,190,203,276,408,547,675,734],
                label: "Europe",
                borderColor: "#3cba9f",
                fill: false
              }, { 
                data: [40,20,10,16,24,38,74,167,508,784],
                label: "Latin America",
                borderColor: "#e8c3b9",
                fill: false
              }, { 
                data: [6,3,2,2,7,26,82,172,312,433],
                label: "North America",
                borderColor: "#c45850",
                fill: false
              }
            ]
          }*/
          data: {
            labels: labels,
            datasets: datasets
          }
        });
    };

    emotion_classifier.init(emotionModel);

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
                    
                    if (emotions) {
                        emotions.forEach(function (t) {
                            var emotion = t['emotion'];
                            emotion_data[emotion].push(t['value']);
                        });
                    }
                }
            }, 500);

            setInterval(() => {
                drawChart(emotion_data);
            }, 2000);
        }
    ).catch(
        (err) => {
        	console.log("Error loading video");
        }
    )
};
