import styled, { keyframes, css } from "styled-components";

type DivProps = {
  maxWidth?: number;
  maxHeight?: number;
};

type EffectItemProps = {
  selected?: boolean
}

const flashAnimation = keyframes`
  from {
    opacity: 0.75;
  }

  to {
    opacity: 0;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
`;

export const Container = styled.div<DivProps>`
  position: relative;
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth && `${maxWidth}px`};
  max-height: ${({ maxHeight }) => maxHeight && `${maxHeight}px`};
  overflow: hidden;
`;

export const Canvas = styled.canvas<any>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const Video = styled.video<any>`
  position: absolute;

  &::-webkit-media-controls-play-button {
    display: none !important;
    -webkit-appearance: none;
  }
`;

export const EffectList = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
  gap: 1.25em;
`;

export const EffectItem = styled.p<EffectItemProps>`
  text-transform: uppercase;
  cursor: pointer;
  color: ${({ selected }) => selected && "#e4b872"};
`;

export const Flash = styled.div<any>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  opacity: 0;

  ${({ flash }) => {
    if (flash) {
      return css`
        animation: ${flashAnimation} 750ms ease-out;
      `;
    }
  }}
`;

export const Button = styled.button`
  position: relative;
  width: 100px;
  height: 100px;
  margin-top: 24px;
  padding: 12px 24px;
  background: #6d9da6;
  border-radius: 100%;
  border-spacing: 10px;
  border: 2px solid #6d9da6;
  cursor: pointer;

  :after {
    content: "";
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border-radius: 100%;
    border: 2px solid #6d9da6;
  }

  :hover {
    background: #344b4f;
    border: 2px solid #344b4f;
  }
`;

export const Actions = styled.div<DivProps>`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth && `${maxWidth}px`};
  margin-top: 24px;
`;

export const ActionItem = styled.button`
  background: transparent;
  border: none;
  width: 100px;
  height: 100px;
  padding: 12px 24px;
  font-size: 3em;
  cursor: pointer;
`;

export const ErrorMessage = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  width: 100%;

  padding: 40px;
`;
