import { Fragment, useState } from "react";

import Camera from "@/components/camera";
import Home from "@/components/home";
import { Root, GlobalStyle } from "./style";

function App() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  return (
    <Fragment>
      <Root>
        {!isCameraOpen && <Home openCamera={() => setIsCameraOpen(true)} />}
        {isCameraOpen && <Camera />}
      </Root>
      <GlobalStyle />
    </Fragment>
  );
}

export default App;
