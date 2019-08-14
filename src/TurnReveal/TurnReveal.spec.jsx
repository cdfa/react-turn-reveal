import React from "react";
import { render } from "@testing-library/react";

import Direction from "src/Direction";
import Pose from "src/Pose";

import TurnReveal from "./";

it("renders welcome message", () => {
  const perspective = 400;
  render(
    <div style={{ position: "relative", perspective: perspective + "px" }}>
      <TurnReveal
        direction={Direction.right}
        pose={Pose.out}
        perspective={perspective}
      >
        Welcome to React
      </TurnReveal>
    </div>
  );
});
