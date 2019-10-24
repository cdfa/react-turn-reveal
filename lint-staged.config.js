module.exports = {
  [`{*,{src,docs}{/*,/**/*}}.{js,jsx,json,md,mdx}`]: [
    "eslint --fix --format friendly --max-warnings=0",
    () => "npm run build",
    () => "jest -o",
    "git add"
  ],
  ".circleci/config.yml":
    'cross-env-shell test "a$CI" = a1 || circleci config validate',
  ".circleci/images/primary/Dockerfile": "dockerfile-utils lint",
  "netlify.toml": "toml-checker"
};
