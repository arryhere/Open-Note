import express from 'express';
import UserController from '../controller/UserController.js';

const router = express.Router()

// test endpoints
router.get('/test', (req, res) => {
    res.status(200).json({
        status: 'success',
    })
    // res.redirect('http://www.google.com')
})
router.post('/test', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: req.body
    })
})

// user endpoint
router.post('/signup', (req, res) => {
    const userController = new UserController()
    userController.signupUser(req, res)
})

router.post('/login', (req, res) => {
    const userController = new UserController()
    userController.loginUser(req, res)
})

router.get('/profile', (req, res) => {
    const userController = new UserController()
    userController.profile(req, res)
})

export default router