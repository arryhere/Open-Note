import express from 'express';
import UserModel from '../models/UserModel.js';

const router = express.Router()

// test endpoints
router.get('/test', (req, res) => {
    res.status(200).json({
        status: 'success',
        path: '/api/users/test'
    })
})
router.post('/test', (req, res) => {
    res.status(200).json({
        status: 'success',
        path: '/api/users/test',
        data: req.body
    })
})

// create user endpoint
router.post('/', (req, res) => {
    const user = new UserModel(req.body)
    user.save((err) => { err ? console.log(err.message) : console.log('status: data inserted successfully') })
    res.status(200).json({
        status: 'success',
        path: '/api/auth/test',
        data: req.body
    })
})

export default router