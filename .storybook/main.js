const path = require('path');

module.exports = {
  stories: [
    "../src/stories/components/**/stories.jsx",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app"
  ],
  framework: "@storybook/react",
  core: {
    builder: "webpack5"
  },
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        alias: {
          components: path.resolve('src', 'stories', 'components'),
          utils: path.resolve('src', 'stories', 'utils'),
        },
        modules: ['node_modules'],
        symlinks: false,
        extensions: ['.jsx','.js'],
      }
    }
  },
}
