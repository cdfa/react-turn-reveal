const babelConfig = require("../babel.config.js");
const path = require("path");

// copy babel config
exports.onCreateBabelConfig = ({
  actions: { setBabelPlugin, setBabelPreset }
}) => {
  babelConfig.presets.map(asConfig).forEach(setBabelPreset);
  const pluginConfigs = Array.from(
    babelConfig.plugins.map(asConfig).map(expandPluginName)
  );
  pluginConfigs.forEach(setBabelPlugin);

  const moduleResolverPlugin = pluginConfigs.find(
    plugin => plugin.name === "babel-plugin-module-resolver"
  );
  moduleResolverPlugin.options.root = "../";
  setBabelPlugin(moduleResolverPlugin);
};

const asConfig = item =>
  typeof item === "string"
    ? { name: item }
    : { name: item[0], options: item[1] };

const expandPluginName = config => {
  if (
    !(
      config.name.startsWith("babel-plugin-") ||
      config.name.startsWith("@babel/")
    )
  )
    config.name = "babel-plugin-" + config.name;

  return config;
};

const readmePath = path.resolve("..", "README.md");

// Route / to README
exports.onCreatePage = ({ page, actions: { createPage, deletePage } }) => {
  if (page.component === readmePath) {
    const homePage = Object.assign({}, page);
    homePage.path = "/";
    createPage(homePage);
  } else if (page.path === "/") {
    deletePage(page);
  }
};
