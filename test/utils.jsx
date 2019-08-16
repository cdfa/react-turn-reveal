import { act, render } from "@testing-library/react";
import React from "react";

const sleep = ms => new Promise(resolve => setTimeout(() => resolve(), ms));

export const renderAsync = async (...args) => {
  let result;
  await act(async () => {
    // noinspection JSCheckFunctionSignatures
    result = render(...args);
    await sleep(100); // Wait for update from useSize hook
  });
  // noinspection JSUnusedAssignment
  return result;
};

export const itRendersChildren = (Component, renderFunction = render) => {
  const childId = "child";
  const childComponent = <div data-testid={childId} />;
  it("renders it's children", async () => {
    const { container, getByTestId } = await renderFunction(
      <Component>{childComponent}</Component>
    );
    const child = getByTestId(childId);
    // noinspection JSUnresolvedFunction
    expect(container).toContainElement(child);
  });
};
