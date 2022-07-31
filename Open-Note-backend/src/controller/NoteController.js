import NotesModel from "../models/NoteModel.js";
import NotesValidation from "../validation/NotesValidation.js";

class NoteController {

  getAllNotes = async (req, res) => {
    const notes = await NotesModel.find({ user: req.user.id })
    res.status(200).json(notes)
  }

  addNote = async (req, res) => {
    //note validation
    const { error, value } = NotesValidation.notesSchema.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(400).json({ status: 'joi-notesValidtion-failed', response: error.details });
    } else {
      //insert note
      const note = new NotesModel({
        user: req.user.id,
        title: value.title,
        description: value.description,
        tag: value.tag
      })
      note.save((error, note) => {
        if (error) {
          res.status(500).json({ status: 'db-note-insert-failed', response: error.message });
        } else {
          res.status(200).json({ status: 'db-note-insert-success', response: note });
        }
      })
    }
  }

  editNote = async (req, res) => {
    const { title, description, tag } = req.body;
    // note object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };
    // update note
    let note = await NotesModel.findById(req.params.id);
    if (!note) {
      res.status(404).json({ status: 'db-note-fetch-failed', response: 'note not found' });
    } else {
      let bool = (note.user.toString() === req.user.id)
      if (note.user.toString() !== req.user.id) {
        res.status(401).json({ status: 'failed', response: 'unauthorized' });
      } else {
        note = await NotesModel.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.status(200).json({ status: 'db-note-update-success', response: note });
      }
    }

  }

  deleteNote = async (req, res) => {
    // delete note
    let note = await NotesModel.findById(req.params.id);
    if (!note) {
      res.status(404).json({ status: 'db-note-fetch-failed', response: 'note not found' });
    } else {
      if (note.user.toString() !== String(req.user.id)) {
        res.status(401).json({ status: 'failed', response: 'unauthorized' });
      } else {
        note = await NotesModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: 'db-note-deleted-success', response: note });
      }
    }
  }
}

export default NoteController;