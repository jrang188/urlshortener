/* eslint-disable no-console */
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import isValidUrl from './utils';
import { isGeneratorFunction } from 'util/types';

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
  if (!isValidUrl(originalURL)) {
    return res.json({ error: 'invalid url' });
  }

  const existingUrl = await prisma.url.findUnique({
    where: {
      originalURL,
    },
  });

  if (!existingUrl) {
    const url = await prisma.url.create({
      data: {
        originalURL,
      },
    });
    return res.json({ original_url: url.originalURL, short_url: url.id });
  }
  res.json({ original_url: originalURL, short_url: existingUrl.id });
});

app.get('/api/shorturl/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const url = await prisma.url.findUnique({
    where: { id: parseInt(id, 10) },
  });

  if (!url) {
    // If the URL does not exist, return an error response
    return res.status(404).json({ error: 'URL not found' });
  }

  res.redirect(url.originalURL);
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
