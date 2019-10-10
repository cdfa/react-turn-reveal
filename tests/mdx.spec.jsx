import React from "react";
import { render } from "@testing-library/react";
import find from "find";
import pkgDir from "pkg-dir";

import path from "path";

describe("From the documentation, ", () => {
  ["docs", "src"]
    .flatMap(dir => find.fileSync(/\.mdx$/, path.join(pkgDir.sync(), dir)))
    .forEach(file => {
      const parts = file.split(path.sep);
      // eslint-disable-next-line jest/valid-describe
      describe(path.join(...parts.slice(-3, -1)), () => {
        it("renders without crashing", () => {
          const Page = require(file).default;
          render(<Page />);
        });
      });
    });
});
