import generateShortId from '../utils/generateShortId';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const urlDatabase = new Map<string, string>(); // shortId -> originalUrl

export async function createShortUrl(originalUrl: string): Promise<string> {
  const shortId = generateShortId();
  urlDatabase.set(shortId, originalUrl);
  return `${process.env.BASE_URL || 'http://localhost:3000'}/${shortId}`;
}

export async function findOriginalUrl(shortId: string): Promise<string | undefined> {
  return urlDatabase.get(shortId);
}

export async function listAllUrls() {
  try {
    return await prisma.url.findMany({
      select: {
        idUrl: true,
        originalUrl: true,
        shortCode: true
      }
    });
  } catch (error) {
    console.error('Erro ao listar URLs:', error);
    throw error;
  }
}
