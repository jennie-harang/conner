const TsconfigPathsPlugin  = require('tsconfig-paths-webpack-plugin')

module.exports = {
  staticDirs: ['../public'],
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-docs",
  ],
  "framework": "@storybook/react",
  webpackFinal: async (config) => {
    config.resolve.plugins.push(new TsconfigPathsPlugin({}));

    return config;
  },
  babel: async (options) => {
    options.plugins.push("babel-plugin-inline-react-svg");

    return options;
  },
}
