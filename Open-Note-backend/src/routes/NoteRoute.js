import express from 'express';
import NoteController from '../controller/NoteController.js';
import fetchUser from '../middleware/fetchUser.js';

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


// notes endpoints
router.get('/getAllNotes', fetchUser, (req, res) => {
    const noteController = new NoteController();
    noteController.getAllNotes(req, res);
})

router.post('/addNote', fetchUser, (req, res) => {
    const noteController = new NoteController();
    noteController.addNote(req, res);
})

router.put('/editNote/:id', fetchUser, (req, res) => {
    const noteController = new NoteController();
    noteController.editNote(req, res);
})

router.delete('/deleteNote/:id', fetchUser, (req, res) => {
    const noteController = new NoteController();
    noteController.deleteNote(req, res);
})

export default router