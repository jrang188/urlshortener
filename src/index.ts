/* eslint-disable no-console */
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(`${process.cwd()}/views/index.html`);
});

// Your first API endpoint
app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
