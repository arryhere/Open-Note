import express from 'express';

const router = express.Router()

// test endpoints
router.get('/test', (req, res) => {
    res.status(200).json({
        status: 'success',
        path: '/api/notes/test'
    })
})

router.post('/test', (req, res) => {
    res.status(200).json({
        status: 'success',
        path: '/api/auth/test',
        data: req.body
    })
})

export default router