import { writeFileSync } from 'fs';

export const writeFile = (path, data) => {
  writeFileSync(path, JSON.stringify(data, null, 2));
};
