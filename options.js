window.onload = () => {
	var video = document.getElementById('video');

    navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(
        (stream) => {
           console.log("Success: ", stream);
           video.src = window.URL.createObjectURL(stream);
           video.play();

           /*

           var ctrack = new clm.tracker();
           ctrack.init();

           ctrack.start(video);

           function drawLoop() {

           }

           requestAnimFrame(drawLoop);
           */

        }
    ).catch(
        (err) => {
           console.log("Error: ", err);
        }
    )
};
