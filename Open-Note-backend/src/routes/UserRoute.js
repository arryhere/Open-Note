import express from 'express';
import UserController from '../controller/UserController.js';
import fetchUser from '../middleware/fetchUser.js';

const router = express.Router();
const userController = new UserController();

// user endpoints
router.post('/signup', userController.signupUser);
router.post('/login', userController.loginUser);
router.get('/profile', fetchUser, userController.getProfile);

export default router