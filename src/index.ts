/* eslint-disable no-console */
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const app = express();
const prisma = new PrismaClient();

// Basic Configuration
const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(`${process.cwd()}/views/index.html`);
});

// Your first API endpoint
app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', async (req: Request, res: Response) => {
  const originalURL = req.body.url;
  console.log(originalURL);
  const url = await prisma.url.create({
    data: {
      originalURL,
    },
  });
  res.json({ original_url: url.originalURL, short_url: url.id });
});

app.get('/api/shorturl/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const url = await prisma.url.findUnique({
    where: {id: parseInt(id, 10)},
  });
  res.redirect(url.originalURL);
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
