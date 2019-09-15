import { render } from "@testing-library/react";
import React from "react";

// eslint-disable-next-line import/prefer-default-export
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
