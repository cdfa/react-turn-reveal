module.exports = {
  "{*,{src,docs,scripts}{/*,/**/*}}.{js,jsx,json,md,mdx}": [
    "eslint --fix --format friendly --max-warnings=0",
    () => "npm run build",
    () => "jest -o",
    "git add"
  ],
  ".circleci/config.yml":
    'cross-env-shell test "a$CI" = a1 || circleci-cli config validate',
  "netlify.toml": "toml-checker",
  "{!(nix)/**/*,nix/**/!(sources)}.nix": [
    "nixpkgs-fmt",
    "git add",
    "nix-linter -Wno-UnusedArg"
  ],
  "shell.nix": "nix-shell --run ''",
  ".circleci/images/primary/default.nix": "nix-build --no-out-link"
};
