export default function connectAudioDevice(device) {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices
      .getUserMedia({ audio: false })
      .then((stream) => {
        resolve(stream);
      })
      .catch((error) => {
        resolve(error);
      });
  });
}
