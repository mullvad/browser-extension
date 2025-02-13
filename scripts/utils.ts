import { bgCyan, black } from 'kolorist';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export function log(name: string, message: string) {
  console.log(black(bgCyan(` ${name} `)), message);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const port = parseInt(process.env.PORT || '') || 3303;
export const isDev = process.env.NODE_ENV !== 'production';

export const r = (...args: string[]) => resolve(__dirname, '..', ...args);
