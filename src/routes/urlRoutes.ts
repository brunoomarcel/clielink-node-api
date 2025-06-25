import { Router, Request, Response, NextFunction } from 'express';
import * as urlController from '../controllers/UrlController';

const router = Router();

// Middleware simples para validar body da requisição POST /shorten
function validateOriginalUrl(req: Request, res: Response, next: NextFunction) {
  const { originalUrl } = req.body;
  if (!originalUrl || typeof originalUrl !== 'string') {
    return res.status(400).json({ error: 'originalUrl é obrigatório e deve ser uma string' });
  }
  next();
}

// Rota para criar URL encurtada, com validação antes do controller
// router.post('/shorten', validateOriginalUrl, urlController.createShortUrl);

// // Rota para redirecionar para URL original
// router.get('/:shortId', urlController.redirectToOriginalUrl);

router.get('/list', urlController.listUrls);

export default router;
