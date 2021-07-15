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
};
