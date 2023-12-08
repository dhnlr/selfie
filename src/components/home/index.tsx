import { Copy, Main, Hero, Title, Description, Button } from "./style";
import Footer from "../footer";
import heroImg from "../../assets/hero.png";

type HomeProps = {
  openCamera: ()=> void
}
function Home({ openCamera }: HomeProps) {
  return (
    <>
      <Main>
        <Copy>
          <Title>Selfie</Title>
          <Description>Appreciate yourself as work of art</Description>
          <Button onClick={openCamera}>Get Started</Button>
        </Copy>
        <Hero>
          <img src={heroImg} alt="selfie" width="300px" />
        </Hero>
      </Main>
      <Footer />
    </>
  );
}

export default Home;
