import React from "react";

import Direction from "src/Direction";
import Pose from "src/Pose";

import { itRendersChildren, renderAsync } from "test/utils";

import TurnReveal from "./";

// Might be useful in the future with more tests
// const TurnRevealWrapper = ({ pose = Pose.closed, children }) => {
//   const perspective = 400;
//   return (
//     <div style={{ position: "relative", perspective: perspective + "px" }}>
//       <TurnReveal
//         direction={Direction.right}
//         pose={pose}
//         perspective={perspective}
//       >
//         {children}
//       </TurnReveal>
//     </div>
//   );
// };

describe("<TurnReveal>", () => {
  itRendersChildren(
    ({ children }) => (
      <TurnReveal
        perspective={400}
        pose={Pose.closed}
        direction={Direction.right}
      >
        {children}
      </TurnReveal>
    ),
    renderAsync
  );
  // Can't test visibility, because it's controlled by the animation. Also see https://github.com/testing-library/jest-dom/issues/124
  // Can't test width with Jest, because the layout isn't actually calculated
  // No tests for the animation being on the correct side, because it would be to complicated in comparison to the actual code
});
