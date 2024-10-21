import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { defineConfig } from 'windicss/helpers';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  darkMode: 'class',
  // https://windicss.org/posts/v30.html#attributify-mode
  attributify: true,
  extract: {
    include: [resolve(__dirname, 'src/**/*.{vue,html}')],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Source Sans Pro', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
});
