import { dirname, relative } from 'path';
import { defineConfig, UserConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import WindiCSS from 'vite-plugin-windicss';
import windiConfig from './windi.config';
import { r, port, isDev } from './scripts/utils';

export const sharedConfig: UserConfig = {
  root: r('src'),
  resolve: {
    alias: {
      '@/': `${r('src')}/`,
    },
  },
  define: {
    __DEV__: isDev,
  },
  plugins: [
    Vue(),

    // rewrite assets to use relative path
    {
      name: 'assets-rewrite',
      enforce: 'post',
      apply: 'build',
      transformIndexHtml(html, { path }) {
        return html.replace(/"\/assets\//g, `"${relative(dirname(path), '/assets')}/`);
      },
    },
  ],
  optimizeDeps: {
    include: ['vue', '@vueuse/core', 'webextension-polyfill'],
    exclude: ['vue-demi'],
  },
};

export default defineConfig(({ command }) => ({
  ...sharedConfig,
  base: command === 'serve' ? `http://localhost:${port}/` : '/dist/',
  server: {
    port,
    hmr: {
      host: 'localhost',
    },
  },
  build: {
    outDir: r('extension/dist'),
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
    // https://developer.chrome.com/docs/webstore/program_policies/#:~:text=Code%20Readability%20Requirements
    terserOptions: {
      mangle: false,
    },
    rollupOptions: {
      input: {
        background: r('src/background/index.html'),
        popup: r('src/popup/index.html'),
      },
    },
  },
  plugins: [
    ...sharedConfig.plugins!,

    // https://github.com/antfu/vite-plugin-windicss
    WindiCSS({
      config: windiConfig,
    }),
  ],
}));
