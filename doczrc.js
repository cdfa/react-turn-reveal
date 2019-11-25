// noinspection JSUnusedGlobalSymbols
export default {
  title: "React Turn Reveal",
  description: "A 3D reveal animation library for React.",
  theme: "docz-theme-default",
  themeConfig: {
    mode: "dark"
  },
  menu: ["README", "TurnReveal", "FollowReveal"],
  filterComponents: files =>
    files.filter(filepath => /src\/.*\/*\.(js|jsx)$/.test(filepath))
};
