// Note: presets and plugins are merged with those of Gatsby when building the documentation

module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-export-default-from",
    [
      "module-resolver",
      {
        root: ["."],
        extensions: [".js", ".jsx", ".mdx", ".md"]
      }
    ]
  ],
  env: {
    test: {
      plugins: [
        "@babel/plugin-transform-runtime",
        "transform-assets-import-to-string"
      ]
    }
  }
};
