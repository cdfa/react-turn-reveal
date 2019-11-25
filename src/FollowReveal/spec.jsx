import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { itRendersChildren } from "testUtils/itRendersChildren";

import Pose from "src/Pose";

import Direction from "src/Direction";

import testIds from "../../testUtils/testIds";

// Disabling no-useless-path-segments, because removing it makes the tests fail for reasons I can't understand
// The warning also only seems to appear on the CI for similarly incomprehensible reasons
// Removing the "/" also seems to break test coverage, or at least in Webstorm
// eslint-disable-next-line import/no-useless-path-segments
import FollowReveal from "./";

jest.mock("src/TurnReveal/index.jsx", () => {
  const TurnRevealModule = jest.requireActual("../TurnReveal/index.jsx");
  return {
    __esModule: true,
    default: props => (
      <>
        {props.direction}
        {props.pose}
        <TurnRevealModule.default {...props} />
      </>
    )
  };
});

const width = 120;
const height = 120;

Element.prototype.getBoundingClientRect = jest.fn(() => {
  return {
    width,
    height,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  };
});

const FollowRevealWrapper = props => {
  const perspective = 400;
  return (
    <div style={{ position: "relative", perspective: perspective + "px" }}>
      <FollowReveal perspective={perspective} {...props} />
    </div>
  );
};

describe("<FollowReveal>", () => {
  itRendersChildren(({ children }) => (
    <FollowReveal perspective={400}>{children}</FollowReveal>
  ));
  // Can't test that it passes the right direction prop, because the layout isn't actually calculated, so no getBoundingClientRect
  describe.each([
    [width, height / 2, Direction.right],
    [width / 2, 0, Direction.top],
    [0, height / 2, Direction.left],
    [width / 2, height, Direction.bottom]
  ])("x: %i, y: %i, direction: %s", (x, y, direction) => {
    it("animates in the right direction", async () => {
      const { container, getByTestId } = render(
        <FollowRevealWrapper>
          <div />
        </FollowRevealWrapper>
      );
      const eventCatcher = getByTestId(testIds.eventCatcher);
      fireEvent.mouseEnter(eventCatcher, { clientX: x, clientY: y });
      expect(container).toHaveTextContent(direction);
      expect(container).toHaveTextContent(Pose.closed);
      fireEvent.mouseLeave(eventCatcher, { clientX: x, clientY: y });
      expect(container).toHaveTextContent(direction);
      expect(container).toHaveTextContent(Pose.out);
    });
  });

  // Could probably be removed when https://github.com/bitttttten/jest-transformer-mdx/issues/1 is resolved
  it("it renders with a css class", () => {
    const className = "test";
    const { getByTestId } = render(
      <FollowRevealWrapper className={className}>Test</FollowRevealWrapper>
    );
    expect(getByTestId(testIds.animated)).toHaveClass(className);
  });
});
