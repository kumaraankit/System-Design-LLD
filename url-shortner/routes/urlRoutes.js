import express from 'express';
import { redirectUrl, shortenUrl } from '../controllers/urlController.js';


const router = express.Router();

router.post('/shorten', shortenUrl);
router.get('/:shortCode', redirectUrl);

export default router;
