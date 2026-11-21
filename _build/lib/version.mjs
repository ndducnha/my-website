// Short content hash of the CSS and JS, appended as ?v= so browsers fetch the new files after a change.
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const read = (path) => readFileSync(new URL(path, import.meta.url));
export const ASSET_VERSION = createHash('sha256')
  .update(read('../../assets/css/site.css'))
  .update(read('../../assets/js/site.js'))
  .digest('hex').slice(0, 8);
