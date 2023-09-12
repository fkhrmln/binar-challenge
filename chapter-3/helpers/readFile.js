import { readFileSync } from 'fs';

export const readFile = (path, encoding = 'utf-8') => {
  return JSON.parse(readFileSync(path, encoding));
};
