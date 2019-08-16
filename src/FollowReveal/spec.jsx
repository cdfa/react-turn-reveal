import React from "react";

import { itRendersChildren } from "test/utils";

import FollowReveal from "./";

describe("<FollowReveal>", () => {
  itRendersChildren(({ children }) => (
    <FollowReveal perspective={400}>{children}</FollowReveal>
  ));
  // Can't test that it passes the right direction prop, because the layout isn't actually calculated, so no getBoundingClientRect
});
