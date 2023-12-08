import { useState, useRef, useEffect } from "react";
import Measure from "react-measure";

import { useUserMedia } from "../../hooks/use-user-media";
import { useCardRatio } from "../../hooks/use-card-ratio";
import { useOffsets } from "../../hooks/use-offsets";
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

declare var Blob: {
  prototype: Blob;
  new (): Blob;
  new (request: any, mime: string): Blob;
}

function Camera({ onCapture }: { onCapture: (blob: Blob | null) => void }) {
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
  
  useEffect(()=>{
    if (mediaStream && videoRef?.current) {
      videoRef.current.srcObject = mediaStream;
    }
    console.log(mediaStream, videoRef.current, videoRef.current?.srcObject)

  }, [mediaStream, videoRef?.current])

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
    videoRef.current && context?.drawImage(
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

    canvasRef.current?.toBlob((blob) => onCapture(blob), "image/jpeg", 1);
    setIsCanvasEmpty(false);
    setIsFlashing(true);
  }

  function handleSave() {
    let canvasImage = canvasRef.current?.toDataURL("image/jpeg", 1) || '';

    let xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = function () {
      let a = document.createElement("a");
      a.href = window.URL.createObjectURL(xhr.response);
      a.download = "image_name.jpg";
      a.click();
      a.remove();
    };
    xhr.open("GET", canvasImage);
    xhr.send();
  }

  function handleClear() {
    const context = canvasRef.current?.getContext("2d");
    canvasRef.current && context?.clearRect(0, 0, canvasRef.current.width, canvasRef.current?.height);
    setIsCanvasEmpty(true);
  }

  function applyFilter(filter: string, ref: any) {
    switch (filter) {
      case "blur":
        ref.filter = `blur(30px)`;
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
          {({ measureRef }: {measureRef: any}) => (
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
                      <Button onClick={handleCapture} />
                    </>
                  )}
                  {!isCanvasEmpty && (
                    <Actions
                      maxWidth={videoRef.current && videoRef.current.videoWidth}
                    >
                      <ActionItem onClick={handleClear}>🔄</ActionItem>
                      <ActionItem onClick={handleSave}>💾</ActionItem>
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
