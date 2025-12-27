import express from 'express';
import { subscribe, unsubscribe } from '../controllers/newsletter.controller.js';

const router = express.Router();

// Subscribe to newsletter
router.post('/subscribe', subscribe);

// Unsubscribe from newsletter
router.post('/unsubscribe', unsubscribe);

export default router;
