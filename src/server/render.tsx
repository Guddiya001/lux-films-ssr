import fs from "fs";
import path from "path";

export async function render(url: string) {
  // In production, serve the built index.html so asset hashes are correct
  if (process.env.NODE_ENV === "production") {
    const indexPath = path.join(process.cwd(), "dist", "client", "index.html");
    if (fs.existsSync(indexPath)) {
      return fs.readFileSync(indexPath, "utf-8");
    }
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
