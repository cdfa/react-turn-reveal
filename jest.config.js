module.exports = {
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  coveragePathIgnorePatterns: ["/node_modules/", "/coverage/", "/dist/"],

  // Make calling deprecated APIs throw helpful error messages
  errorOnDeprecated: false,

  // An array of file extensions your modules use
  moduleFileExtensions: ["js", "json", "jsx", "mdx"],

  // Automatically restore mock state between every test
  restoreMocks: false,

  // A list of paths to directories that Jest should use to search for files in
  roots: ["src", "docs"],

  setupFilesAfterEnv: ["<rootDir>/test/setup.js"],

  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest"
  }
};
