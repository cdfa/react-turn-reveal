{ pkgs ? import ./nix { }
, extraDevDependencies ? import ./nix/dev-dependencies.nix { }}:
let
  # To enable running Podman in rootless mode, follow: https://wiki.archlinux.org/index.php/Linux_Containers#Enable_support_to_run_unprivileged_containers_(optional)

  # Provides a script that copies required files to ~/
  podmanSetupScript =
    let
      registriesConf = pkgs.writeText "registries.conf" ''
        [registries.search]
        registries = ['docker.io']

        [registries.block]
        registries = []
      '';
    in
    pkgs.writeShellScript "podman-setup" ''
      # Dont overwrite customised configuration
      if ! test -f ~/.config/containers/policy.json; then
        install -Dm555 ${pkgs.skopeo.src}/default-policy.json ~/.config/containers/policy.json
      fi

      if ! test -f ~/.config/containers/registries.conf; then
        install -Dm555 ${registriesConf} ~/.config/containers/registries.conf
      fi
    '';

  # Provides a fake "docker" binary mapping to podman
  dockerCompat = pkgs.runCommandNoCC "docker-podman-compat" { } ''
    mkdir -p $out/bin
    ln -s ${pkgs.podman}/bin/podman $out/bin/docker
  '';

in
pkgs.mkShell {

  buildInputs = with pkgs; [
    dockerCompat
    podman # Docker compat
    crun # Container runtime
    conmon # Container runtime monitor
    skopeo # Interact with container registry
    slirp4netns # User-mode networking for unprivileged namespaces
    fuse-overlayfs # CoW for images, much faster than default vfs

    circleci-cli
  ] ++ extraDevDependencies;

  # Only run with
  shellHook = ''
    # Install required configuration
    ${podmanSetupScript}

    alias npm="pnpm"
  '';

}
