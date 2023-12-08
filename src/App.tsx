import { Fragment, useState } from "react";
import Camera from "./components/camera";
import Home from "./components/home";
import { Root, GlobalStyle } from "./style";

function App() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [_cardImage, setCardImage] = useState();

  return (
    <Fragment>
      <Root>
        {!isCameraOpen && <Home openCamera={() => setIsCameraOpen(true)} />}
        {isCameraOpen && (
          <Camera
            onCapture={(blob: any) => setCardImage(blob)}
          />
        )}
      </Root>
      <GlobalStyle />
    </Fragment>
  );
}

export default App;
