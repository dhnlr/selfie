import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  findByText,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";

import Camera from '../camera'
import connectAudioDevice from '../../helpers/device';
describe("Camera", () => {
  it("No camera accessible", async () => {
    render(
      <Camera/>
      );
      expect(screen.getByText("No camera accessible. Please connect your camera or try different browser.")).toBeInTheDocument()
  });
    it("Should render properly", async () => {
      const mockMediaDevices = {
        getUserMedia: jest.fn().mockResolvedValueOnce('camera'),
      };
      Object.defineProperty(window.navigator, 'mediaDevices', {
        writable: true,
        value: mockMediaDevices,
      });
      const actual = await connectAudioDevice();
      render(
        <Camera/>
        );
      
      expect(actual).toBe('camera');
      expect(mockMediaDevices.getUserMedia).toBeCalledWith({ audio: false });
        await waitFor(() => {
          expect(screen.getByText("Selfie")).toBeInTheDocument()
        });
    });

})