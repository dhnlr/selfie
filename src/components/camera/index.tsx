import { useState, useRef, useEffect } from "react";
import Measure from "react-measure";

import { useUserMedia } from "@/hooks/use-user-media";
import { useCardRatio } from "@/hooks/use-card-ratio";
import { useOffsets } from "@/hooks/use-offsets";
import {
  Video,
  Canvas,
  Wrapper,
  Container,
  Flash,
  Button,
  ErrorMessage,
  EffectList,
  EffectItem,
  Actions,
  ActionItem,
} from "./style";

const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: "user" },
};

function Camera() {
  const canvasRef = useRef<HTMLCanvasElement>();
  const videoRef = useRef<HTMLVideoElement>();

  const [container, setContainer] = useState({ width: 0, height: 0 });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);
  const [isFlashing, setIsFlashing] = useState(false);
  const [filter, setFilter] = useState("");

  const { mediaStream, mediaError } = useUserMedia(CAPTURE_OPTIONS);
  const [aspectRatio, calculateRatio] = useCardRatio(1.586);
  const offsets = useOffsets(
    videoRef.current?.videoWidth,
    videoRef.current?.videoHeight,
    container.width,
    container.height
  );

  useEffect(() => {
    if (mediaStream && videoRef?.current) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream, videoRef?.current]);

  function handleResize(contentRect: any) {
    setContainer({
      width: contentRect.bounds?.width,
      height: Math.round(contentRect.bounds?.width / aspectRatio),
    });
  }

  function handleCanPlay() {
    calculateRatio(videoRef.current?.videoHeight, videoRef.current?.videoWidth);
    setIsVideoPlaying(true);
    videoRef.current?.play();
  }

  function handleEffect(effect: string) {
    applyFilter(effect, videoRef.current?.style);
    setFilter(effect);
  }

  function handleCapture() {
    const context = canvasRef.current?.getContext("2d");

    applyFilter(filter, context);
    videoRef.current &&
      context?.drawImage(
        videoRef.current,
        offsets.x,
        offsets.y,
        container.width,
        container.height,
        0,
        0,
        container.width,
        container.height
      );

    canvasRef.current?.toBlob(() => {}, "image/jpeg", 1);
    setIsCanvasEmpty(false);
    setIsFlashing(true);
  }

  function handleSave() {
    let canvasImage = canvasRef.current?.toDataURL("image/jpeg", 1) || "";

    let xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = function () {
      let a = document.createElement("a");
      a.href = window.URL.createObjectURL(xhr.response);
      a.download = "selfie-dhnlr.jpg";
      a.click();
      a.remove();
    };
    xhr.open("GET", canvasImage);
    xhr.send();
  }

  function handleClear() {
    const context = canvasRef.current?.getContext("2d");
    canvasRef.current &&
      context?.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current?.height
      );
    setIsCanvasEmpty(true);
  }

  function applyFilter(filter: string, ref: any) {
    switch (filter) {
      case "blur":
        ref.filter = `blur(20px)`;
        break;
      case "sepia":
        ref.filter = `sepia(60%)`;
        break;
      case "grayscale":
        ref.filter = `grayscale(100%)`;
        break;
      default:
        ref.filter = ``;
        break;
    }
  }

  return (
    <>
      {!!mediaError && (
        <ErrorMessage>
          <p>{mediaError}</p>
        </ErrorMessage>
      )}
      {!mediaError && (
        <Measure bounds onResize={handleResize}>
          {({ measureRef }: { measureRef: any }) => (
            <Wrapper>
              <h1>Selfie</h1>
              <Container
                ref={measureRef}
                maxHeight={videoRef.current && videoRef.current.videoHeight}
                maxWidth={videoRef.current && videoRef.current.videoWidth}
                style={{
                  height: `${container.height}px`,
                }}
              >
                <Video
                  ref={videoRef}
                  hidden={!isVideoPlaying}
                  onCanPlay={handleCanPlay}
                  autoPlay
                  playsInline
                  muted
                  disablePictureInPicture
                  style={{
                    top: `-${offsets.y}px`,
                    left: `-${offsets.x}px`,
                  }}
                />

                <Canvas
                  ref={canvasRef}
                  width={container.width}
                  height={container.height}
                />

                <Flash
                  flash={isFlashing}
                  onAnimationEnd={() => setIsFlashing(false)}
                />
              </Container>

              {isVideoPlaying && (
                <>
                  {isCanvasEmpty && (
                    <>
                      <EffectList>
                        <EffectItem
                          selected={filter === ""}
                          onClick={() => handleEffect("")}
                        >
                          None
                        </EffectItem>
                        <EffectItem
                          selected={filter === "blur"}
                          onClick={() => handleEffect("blur")}
                        >
                          Blur
                        </EffectItem>
                        <EffectItem
                          selected={filter === "sepia"}
                          onClick={() => handleEffect("sepia")}
                        >
                          Sepia
                        </EffectItem>
                        <EffectItem
                          selected={filter === "grayscale"}
                          onClick={() => handleEffect("grayscale")}
                        >
                          Grayscale
                        </EffectItem>
                      </EffectList>
                      <Button onClick={handleCapture} title="Take photo" />
                    </>
                  )}
                  {!isCanvasEmpty && (
                    <Actions
                      maxWidth={videoRef.current && videoRef.current.videoWidth}
                    >
                      <ActionItem onClick={handleClear} title="Retake">
                        <svg
                          width="1.4em"
                          height="1.4em"
                          viewBox="-0.5 0 25 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22 19.4199H8C6.4087 19.4199 4.88254 18.7878 3.75732 17.6626C2.63211 16.5374 2 15.0112 2 13.4199V11.6699"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M19 22.4199L22 19.4199L19 16.4199"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M2 5.41992H16C17.5913 5.41992 19.1174 6.05203 20.2426 7.17725C21.3678 8.30246 22 9.82862 22 11.4199V13.22"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M5 2.41992L2 5.41992L5 8.41992"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </ActionItem>
                      <ActionItem onClick={handleSave} title="Download">
                        <svg
                          width="1.4em"
                          height="1.4em"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 11C8.10457 11 9 10.1046 9 9C9 7.89543 8.10457 7 7 7C5.89543 7 5 7.89543 5 9C5 10.1046 5.89543 11 7 11Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M5.56055 21C11.1305 11.1 15.7605 9.35991 21.0005 15.7899"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M13.28 3H5C3.93913 3 2.92172 3.42136 2.17157 4.17151C1.42142 4.92165 1 5.93913 1 7V17C1 18.0609 1.42142 19.0782 2.17157 19.8284C2.92172 20.5785 3.93913 21 5 21H17C18.0609 21 19.0783 20.5785 19.8284 19.8284C20.5786 19.0782 21 18.0609 21 17V11"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M18.75 0.829956V8.82996"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M21.9508 5.63L18.7508 8.83L15.5508 5.63"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </ActionItem>
                    </Actions>
                  )}
                </>
              )}
            </Wrapper>
          )}
        </Measure>
      )}
    </>
  );
}

export default Camera;
