import styled from "styled-components";

export const Main = styled.section`
  display: flex;
  flex-flow: row;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 2em;
  width: 100%;
  max-width: 800px;
  margin: 0 2em;
  padding: 1em 2em;
  
  @media (max-width: 600px) {
    background-image: url(/grid.svg);
    flex-flow: column;
  }
`;

export const Copy = styled.div`
  padding: 0 1em;
  text-align: start;
  width: 100%;

  @media (max-width: 600px) {
    text-align: center;
  }
`;

export const Hero = styled.div`
  width: 100%;
  max-width: 368px;
  margin-bottom: 1em;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const Title = styled.h1`
  font-size: 6em;
  font-weight: 700;
  margin: 0 0 0.2em;
  line-height: 1.4;
  color: #e6b974;
`;

export const Description = styled.p`
  font-size: 1.4em;
  margin: 0.75em 0;
  text-wrap: balance;
`;

export const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #6d9da6;
  background: #6d9da6;
  padding: 1em;
  color: #fff;
  font-size: 1em;
  cursor: pointer;

  :hover {
    background: #344b4f;
    border: 1px solid #344b4f;
  }
`;
