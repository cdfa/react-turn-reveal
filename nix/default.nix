{ sources ? import ./sources.nix }:

import sources.nixpkgs {
  overlays = [
    (_: _: { inherit sources; })
    (_: pkgs: { nix-linter = (import pkgs.sources.nix-linter { }).nix-linter; })
  ];
  config = { };
}
