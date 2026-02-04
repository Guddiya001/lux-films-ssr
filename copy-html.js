import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Copy index.html
const htmlSource = path.join(__dirname, 'dist', 'client', 'index.html');
const htmlDestination = path.join(__dirname, 'api', 'template.html');

try {
  fs.copyFileSync(htmlSource, htmlDestination);
  console.log('Copied index.html to api/template.html');
} catch (error) {
  console.error('Error copying index.html:', error);
  process.exit(1);
}

// Copy render.js
const renderSource = path.join(__dirname, 'dist', 'server', 'render.js');
const renderDestination = path.join(__dirname, 'api', 'render.js');

try {
  fs.copyFileSync(renderSource, renderDestination);
  console.log('Copied render.js to api/render.js');
} catch (error) {
  console.error('Error copying render.js:', error);
  process.exit(1);
}
