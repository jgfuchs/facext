byid = (id) => document.getElementById(id);

window.onload = () => {
    navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(
        (stream) => {
            byid("ok").style.display = "block";
            byid("status").innerHTML = "You can now close this window.";
        }
    ).catch(
        (err) => {
            byid("error").style.display = "block";
            console.log(err);
            byid("status").innerHTML = "Caught " + err.name;
        }
    )
};
