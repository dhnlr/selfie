import { useState, useEffect } from "react";

export function useUserMedia(requestedMedia: MediaStreamConstraints) {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [mediaError, setMediaError] = useState("");

  useEffect(() => {
    async function enableVideoStream() {
      try {
        if (navigator?.mediaDevices?.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia(
            requestedMedia
          );
          setMediaStream(stream);
        } else {
          const getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;
          if (getUserMedia) {
            getUserMedia(
              requestedMedia,
              (stream) => {
                setMediaStream(stream);
              },
              (err) => {
                handleError(err);
              }
            );
          }
        }
      } catch (err: any) {
        handleError(err);
      }
    }

    if (!mediaStream) {
      enableVideoStream();
    } else {
      return function cleanup() {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      };
    }
  }, [mediaStream, requestedMedia]);

  const handleError = (err: any) => {
    if (
      err?.name === "NotAllowedError" ||
      err?.name === "PermissionDeniedError"
    ) {
      setMediaError(
        "Permission denied. Please refresh and give camera permission."
      );
    } else {
      setMediaError(
        "No camera accessible. Please connect your camera or try different browser."
      );
    }
  };

  return { mediaStream, mediaError };
}
