import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  findByText,
} from "@testing-library/react";
import "@testing-library/jest-dom";

import Home from "../home";

describe("Home", () => {
  it("Should render properly", async () => {
    render(<Home openCamera={() => {}} />);

    expect(screen.getByText("Selfie")).toBeInTheDocument();
    expect(
      screen.getByText("Appreciate yourself as work of art")
    ).toBeInTheDocument();
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("DHNLR")).toBeInTheDocument();
  });
});
