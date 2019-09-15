import { useSize } from "react-use";

import React from "react";

let isConsoleWarningOrError = false;

beforeEach(() => {
  const originalError = global.console.error;
  jest.spyOn(global.console, "error").mockImplementation((...args) => {
    isConsoleWarningOrError = true;
    originalError(...args);
  });
  const originalWarn = global.console.warn;
  jest.spyOn(global.console, "warn").mockImplementation((...args) => {
    isConsoleWarningOrError = true;
    originalWarn(...args);
  });
});

afterEach(() => {
  if (isConsoleWarningOrError) {
    throw new Error("Console warnings or errors detected.");
  }
});

jest.mock("react-use");
useSize.mockReturnValue([<div />, { width: 0, height: 0 }]);
