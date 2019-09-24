# Contributing

Due to [`docz` and `react-script` using different versions of `webpack`
at the moment](https://github.com/pedronauck/docz/issues/704) you have
to install dependencies with `pnpm`.
Since (some dependency of) `docz` seems to use dynamic module loading we
also have to use the `--shamefully-flatten` flag.

So install dependencies with:

```shell
pnpm i --shamefully-flatten
```
