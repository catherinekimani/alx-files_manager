import { Router } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';

const router = Router();

// EndPoint: GET /status
router.get('/status', AppController.getStatus);

// EndPoint: GET /stats
router.get('/stats', AppController.getStats);

// Endpoint: POST /users
router.post('/users', UsersController.postNew);

module.exports = router;
