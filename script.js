const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Promp to select media stream, pass to video element, then play
async function selectMediaStream() {
    try {
        // Create a new CaptureController instance
        const controller = new CaptureController();

        const mediaStream = await navigator.mediaDevices.getDisplayMedia({ controller });
        
        // Avoid changing focus to selected stream (remain on application)
        //const [track] = mediaStream.getVideoTracks();
        //const displaySurface = track.getSettings().displaySurface;
        controller.setFocusBehavior("no-focus-change");

        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }
    } catch (error) {
        // Catch error
        console.log("Error while selecting media stream", error);
    }
}

button.addEventListener('click', async () => {
    // Disable button 
    button.disabled = true;

    // Start picture in picture
    await videoElement.requestPictureInPicture();

    // Reset button
    button.disabled = false;
});



// On load
selectMediaStream();