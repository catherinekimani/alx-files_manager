import { Router } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';

const router = Router();

// EndPoint: GET /status
router.get('/status', AppController.getStatus);

// EndPoint: GET /stats
router.get('/stats', AppController.getStats);

// Endpoint: POST /users
router.post('/users', UsersController.postNew);

// Endpoint: GET /connect
router.get('/connect', AuthController.getConnect);

// Endpoint: GET /disconnect
router.get('/disconnect', AuthController.getDisconnect);

// Endpoint: GET /users/me
router.get('/users/me', UsersController.getMe);

module.exports = router;
