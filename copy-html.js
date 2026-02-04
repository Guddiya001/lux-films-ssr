import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const source = path.join(__dirname, 'dist', 'client', 'index.html');
const destination = path.join(__dirname, 'api', 'template.html');

try {
  fs.copyFileSync(source, destination);
  console.log('Copied index.html to api/index.html');
} catch (error) {
  console.error('Error copying index.html:', error);
  process.exit(1);
}
