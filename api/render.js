import fs from "fs";
import path from "path";
export async function render(url) {
    // For Vercel deployment, read the copied index.html with correct asset hashes
    try {
        const indexPath = path.join(process.cwd(), "api", "template.html");
        if (fs.existsSync(indexPath)) {
            return fs.readFileSync(indexPath, "utf-8");
        }
    }
    catch (error) {
        console.error('Error reading api/index.html:', error);
    }
    // Fallback: simple HTML shell used during development
    return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Lux Films</title>
      <link rel="stylesheet" href="/assets/index.css">
    </head>
    <body>
      <div id="root"></div>
      <script type="module" src="/assets/index.js"></script>
    </body>
  </html>
  `;
}
