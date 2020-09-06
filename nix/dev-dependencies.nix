{ pkgs ? import ./default.nix { } }:
with pkgs;
[
  nodePackages.pnpm
  nodejs-12_x
  (haskell.lib.justStaticExecutables nix-linter)
  nixpkgs-fmt
]
