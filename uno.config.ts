import { defineConfig, presetWind3 } from 'unocss';

export default defineConfig({
  presets: [
    presetWind3({
      dark: 'class',
    }),
  ],
  theme: {
    fontFamily: {
      sans: "'Source Sans Pro', Helvetica, Arial, sans-serif",
    },
  },
});
