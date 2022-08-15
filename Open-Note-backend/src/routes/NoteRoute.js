import express from 'express';
import NoteController from '../controller/NoteController.js';
import fetchUser from '../middleware/fetchUser.js';

const router = express.Router();
const noteController = new NoteController();

// notes endpoints
router.get('/getAllNotes', fetchUser, noteController.getAllNotes)

router.post('/addNote', fetchUser, noteController.addNote)

router.put('/editNote/:id', fetchUser, noteController.editNote)

router.delete('/deleteNote/:id', fetchUser, noteController.deleteNote)

export default router