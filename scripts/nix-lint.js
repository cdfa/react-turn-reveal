#!/usr/bin/env node

const shelljs = require("shelljs");

shelljs.config.fatal = true;
shelljs.exec(
  `nix-linter -Wno-UnusedArg ${shelljs
    .find("{**,.*/**}/*.nix")
    .filter(file => file !== "nix/sources.nix")
    .join(" ")}`
);
