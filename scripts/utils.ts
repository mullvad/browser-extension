import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { bgCyan, black } from 'kolorist';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const port = parseInt(process.env.PORT || '') || 3303;
export const r = (...args: string[]) => resolve(__dirname, '..', ...args);
export const isDev = process.env.NODE_ENV !== 'production';

export function log(name: string, message: string) {
  console.log(black(bgCyan(` ${name} `)), message);
}
