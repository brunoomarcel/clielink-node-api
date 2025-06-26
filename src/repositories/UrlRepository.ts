import generateShortId from '../utils/generateShortId';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const urlDatabase = new Map<string, string>(); // shortId -> originalUrl

export async function createShortCode(originalUrl: string): Promise<string> {
  const shortCode = generateShortId();

  await prisma.url.create({
    data: {
      originalUrl,
      shortCode
    }
  });

  return shortCode;
}


export async function findOriginalUrl(shortId: string): Promise<string | null> {
  const found = await prisma.url.findUnique({
    where: {
      shortCode: shortId
    }
  });

  return found?.originalUrl || null;
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
