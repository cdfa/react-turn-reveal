import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import url from "@rollup/plugin-url";

import pkg from "./package.json";

// noinspection JSUnusedGlobalSymbols
export default {
  input: "src/index.js",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
      exports: "named"
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true
    }
  ],
  external: ["styled-components", "prop-types", "react-use"], // See https://github.com/transitive-bullshit/create-react-library/issues/89 and https://stackoverflow.com/a/52935366/11144195
  plugins: [
    external(),
    url(),
    babel(),
    resolve({ extensions: [".js", ".jsx", ".json"] }),
    commonjs()
  ]
};
