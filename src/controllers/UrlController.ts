import { Request, response, Response } from 'express';
import * as urlRepository from '../repositories/UrlRepository';

export async function createShortUrl(req: Request, res: Response) {
  const { originalUrl } = req.body;
  try {
    const shortUrl = await urlRepository.createShortUrl(originalUrl);
    res.status(201).json({ shortUrl });
  } catch (err) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export async function redirectToOriginalUrl(req: Request, res: Response) {
  const { shortId } = req.params;
  try {
    const originalUrl = await urlRepository.findOriginalUrl(shortId);
    if (!originalUrl) {
      return res.status(404).json({ error: 'URL ssnão encontrada' });
    }
    res.redirect(originalUrl);
  } catch (err) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}


export async function listUrls(req: Request, res: Response) {
  try {
    const urls = await urlRepository.listAllUrls();
    res.status(200).json({ urls }); // <-- aqui retorna os dados no JSON
    console.log(urls)
  } catch (err) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}