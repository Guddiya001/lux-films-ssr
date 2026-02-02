import express from "express";
import { render } from "./render.js";
import "dotenv/config";

const app = express();

app.use(express.static("dist/client"));

app.get(/^.*$/, async (req, res) => {
  const html = await render(req.url);
  res.send(html);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
