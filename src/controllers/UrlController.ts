import { Request, Response } from 'express';
import * as urlRepository from '../repositories/UrlRepository';

export const createShortUrl = async (req: Request, res: Response): Promise<void> => {
  const { originalUrl } = req.body;
  try {
    const shortCode = await urlRepository.createShortCode(originalUrl); // ⬅️ Altere o nome da função no repo para separar responsabilidades

    // Monta a URL encurtada dinamicamente
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const shortUrl = `${baseUrl}/${shortCode}`;

    res.status(201).json({ shortUrl });
  } catch (err) {
    console.error('Erro ao criar URL curta:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};


export const redirectToOriginalUrl = async (req: Request, res: Response): Promise<void> => {
  const { shortId } = req.params;
  try {
    const originalUrl = await urlRepository.findOriginalUrl(shortId);
    
    if (!originalUrl) {
      res.status(404).json({ error: 'URL não encontrada' });
      return;
    }
    
    // Redireciona para a URL original
    res.redirect(301, originalUrl);
  } catch (err) {
    console.error('Erro no redirect:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const listUrls = async (req: Request, res: Response): Promise<void> => {
  try {
    const urls = await urlRepository.listAllUrls();
    res.status(200).json({ urls });
    console.log('URLs listadas:', urls.length);
  } catch (err) {
    console.error('Erro ao listar URLs:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};