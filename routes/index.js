import { Router } from 'express';
import AppController from '../controllers/AppController';

const router = Router();

// EndPoint: GET /status
router.get('/status', AppController.getStatus);

// EndPoint: GET /stats
router.get('/stats', AppController.getStats);

module.exports = router;
