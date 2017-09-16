window.onload = () => {
    navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(
        (stream) => {
           console.log("Success: ", stream);
        }
    ).catch(
        (err) => {
           console.log("Error: ", err);
        }
    )
};
