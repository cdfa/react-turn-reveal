# Contributing

## Setup

If you have [direnv](direnv.net) and [nix](https://nixos.org) installed, all you have to do is `cd` into the directory where you clones the repository!

Otherwise, look at `shell.nix` and `nix/dev-dependencies.nix` for development dependencies and any setup you might want to do.
Note that you don't need a the linter/formatter if you don't need to edit a file for which is used.

## Developing in the docs

This project uses [docz](https://www.docz.site) for documentation generation, but this is also where you can
try out the components in some pre-made environments while developing.

## PNPM

This project was developed using [pnpm](https://pnpm.js.org).
There have been cases in the past where `npm` wouldn't even manage to install
all dependencies correctly.
If you run into any dependency related issues, using `pnpm` is the first thing you should try.

## Git workflow

If you're adding a feature or making any other kind of improvement, name your branch `feature/<your-feature>`.

If you're fixing something, name you're branch `fix/<the-thing-youre-going-to-fix>`.

If merge conflicts are detected on your PR, rebase.

If you derped and need to fix something from an older commit,
I'd rather have you revise and force push then adding a tiny fixup commit. Keep the history clean :).

## CircleCI config validation

I went a little overboard on the development environment for this package,
but the only thing that won't work out of the box is validation of the CircleCI config pre-commit.
If you've edited it, you'll need [their CLI](https://circleci.com/docs/2.0/local-cli/) installed on your system.

## Releasing

### Initial setup

1. `npm login`
2. Create a `.npmrc` for publishing to GitHub and enter your token:

```
    //npm.pkg.github.com/:\_authToken=<TOKEN>
    registry=<https://npm.pkg.github.com/cdfa>
```

3. Encrypt it with `gpg`: `gpg -se .npmrc`.
4. Now you can remove the file `rm .npmrc`. It will be decrypted again when publishing.

### Release workflow

1. `git flow release start <version>`
2. `npm version <version>`
3. Update Changelog
4. `npm run publish-all`
5. `git flow release finish`
6. `git push origin --tags`
