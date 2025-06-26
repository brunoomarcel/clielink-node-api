import { Router, RequestHandler } from 'express';
import * as urlController from '../controllers/UrlController';

const router = Router();

router.post('/', urlController.createShortUrl);

router.get('/list', urlController.listUrls);

router.get('/:shortId', urlController.redirectToOriginalUrl);

export default router;
