{ sources ? import ../../../nix/sources.nix
, devDependencies ? import ../../../nix/dev-dependencies.nix { }
, pkgs ? import sources.nixpkgs { }
}:

pkgs.dockerTools.buildImage {
  name = "cdfa/cci-react-turn-reveal-primary";
  tag = "2.0.0";

  contents = with pkgs; [
    # CircleCI deps
    git
    gnutar
    gzip
    busybox
    cacert
  ] ++ devDependencies;
}
