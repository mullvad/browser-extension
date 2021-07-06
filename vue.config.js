module.exports = {
  pages: {
    popup: {
      template: 'public/browser-extension.html',
      entry: './src/popup/main.ts',
      title: 'Popup',
    },
    options: {
      template: 'public/browser-extension.html',
      entry: './src/options/main.ts',
      title: 'Options',
    },
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry: 'src/background.ts',
        },
      },
    },
  },
  chainWebpack: (config) => {
    // Workaround for some import error with webpack
    // See: https://github.com/TypeStrong/fork-ts-checker-webpack-plugin/issues/111#issuecomment-401519194
    config.plugins.delete('fork-ts-checker');
    config.module
      .rule('ts')
      .use('ts-loader')
      .tap((options) => {
        return { ...options, transpileOnly: false };
      });
  },
};
