import * as faceapi from 'face-api.js';
import '@tensorflow/tfjs'; 

let modelsLoaded = false;

export const loadFaceApiModels = async () => {
  if (modelsLoaded) return;
  const MODEL_URL = '/models';
  try {
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    modelsLoaded = true;
    console.log("AI Models Loaded Successfully");
  } catch (error) {
    console.error("Error loading AI models:", error);
  }
};

export const detectDistress = async (videoElement: HTMLVideoElement) => {
  if (!videoElement || !modelsLoaded) return false;

  try {
    const detection = await faceapi
      .detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions({ inputSize: 160, scoreThreshold: 0.4 }))
      .withFaceExpressions();

    if (detection) {
      const { sad, fearful } = detection.expressions;
      
      console.log(`%c EMOTION DATA -> Sad: ${sad.toFixed(2)}, Fear: ${fearful.toFixed(2)}`, "color: #00ff00; font-weight: bold;");
      
      // Threshold lowered to 0.30 so your current 0.34 will trigger it
      if (sad > 0.30 || fearful > 0.30) {
        return true;
      }
    } else {
      console.warn("AI Status: Face not found. Try moving closer or increasing light.");
    }
  } catch (err) {
    console.error("Detection error:", err);
  }
  return false;
};