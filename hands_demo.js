// Get DOM elements
const videoElement = document.getElementById('video');
const canvasElement = document.getElementById('canvas');
const canvasCtx = canvasElement.getContext('2d');

const fileInput = document.getElementById('fileInput');
const img = document.getElementById('img');
const resultsDiv = document.getElementById('results');

let modelPromise = mobilenet.load();

fileInput.addEventListener('change', event => {
  const file = event.target.files[0];
  if (!file) return;

  // Create a URL for the selected file
  const reader = new FileReader();
  reader.onload = e => {
    img.src = e.target.result; // display image

    // Wait for the image to load before classifying
    img.onload = async () => {
      const model = await modelPromise;
      const predictions = await model.classify(img);

      // Show results
      resultsDiv.innerHTML = `<h3>Predictions:</h3>` +
        predictions.map(p => `<p>${p.className}: ${(p.probability*100).toFixed(2)}%</p>`).join('');
      
      console.log(predictions);
    };
  };
  reader.readAsDataURL(file);
});


// // Initialize MediaPipe Hands
// const hands = new Hands({
//   locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
// });

// // Configure Hands
// hands.setOptions({
//   maxNumHands: 2,
//   modelComplexity: 1,
//   minDetectionConfidence: 0.7,
//   minTrackingConfidence: 0.5
// });

// // Called on every frame
// hands.onResults(results => {
//   canvasElement.style.width = video.videoWidth;;
//   canvasElement.style.height = video.videoHeight;
//   canvasElement.width = video.videoWidth;
//   canvasElement.height = video.videoHeight;
  
//   // Draw the video frame
//   canvasCtx.save();
//   canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
//   canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

//   // Draw hand landmarks and connections
//   if (results.multiHandLandmarks) {
//     for (const landmarks of results.multiHandLandmarks) {
//       drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
//                      {color: '#00FF00', lineWidth: 1});
//       drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 1});
//     }
//   }
//   canvasCtx.restore();
// });

// // Setup camera capture
// const camera = new Camera(videoElement, {
//   onFrame: async () => {
//     await hands.send({image: videoElement});
//   },
//   width: 640,
//   height: 480
// });
// camera.start();
