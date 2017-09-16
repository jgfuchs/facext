window.onload = () => {
	var video = document.getElementById('video');
	
    navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(
        (stream) => {
           console.log("Success: ", stream);
           video.src = window.URL.createObjectURL(stream);
           video.play();
        }
    ).catch(
        (err) => {
           console.log("Error: ", err);
        }
    )
};
