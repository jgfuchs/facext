byid = (id) => document.getElementById(id);

window.onload = () => {
    var video = document.getElementById('video'),
        video_width = video.width,
        video_height = video.height,
        overlay = document.getElementById('overlay'),
        overlayCC =overlay.getContext('2d'),
        face_present = false;

    var randomScalingFactor = function() {
        return Math.round(Math.random() * 100);
    };

    var lineChartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "My First dataset",
            fill: false,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ],
            yAxisID: "y-axis-1",
        }, {
            label: "My Second dataset",
            fill: false,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ],
            yAxisID: "y-axis-2"
        }]
    };

    var ctx = document.getElementById('chart_div');
    var myLineChart = new Chart(ctx, {
        data: lineChartData,
        options: {
            responsive: true,
            hoverMode: 'index',
            stacked: false,
            title:{
                display: true,
                text:'Chart.js Line Chart - Multi Axis'
            },
            scales: {
                yAxes: [{
                    type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: "left",
                    id: "y-axis-1",
                }, {
                    type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: "right",
                    id: "y-axis-2",
                    // grid line settings
                    gridLines: {
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                    },
                }],
            }
        }
    });

    navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(
        (stream) => {
            byid("ok").style.display = "block";
            byid("status").innerHTML = "You can now close this window.";

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
            byid("error").style.display = "block";
            byid("status").innerHTML = "Caught " + err.name;
        }
    )
};
