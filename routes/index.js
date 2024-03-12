import { Router } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';

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

// Endpoint: POST /files => FilesController.postUpload
router.post('/files', FilesController.postUpload);

// GET /files/:id => FilesController.getShow
router.get('/files/:id', FilesController.getShow);

// GET /files => FilesController.getIndex
router.get('/files', FilesController.getIndex);

// PUT /files/:id/publish => FilesController.putPublish
router.put('/files/:id/publish', FilesController.putPublish);

// PUT /files/:id/unpublish => FilesController.putUnpublish
router.put('/files/:id/unpublish', FilesController.putUnpublish);

// GET /files/:id/data => FilesController.getFile
router.get('/files:id/data', FilesController.getFile);

module.exports = router;
