{ sources ? import ../../../nix/sources.nix
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

    # package deps
    nodejs-12_x
    nodePackages.pnpm
  ];
}
