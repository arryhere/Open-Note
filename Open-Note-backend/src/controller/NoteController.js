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
      res.status(400).json({
        success: false,
        message: 'Notes Validtion failed',
        data: error.details.map((e) => { return e.message })
      });
    } else {
      //insert note
      const note = new NotesModel({
        user: req.user.id,
        title: value.title,
        description: value.description,
      })
      note.save((error, note) => {
        if (error) {
          res.status(500).json({
            success: false,
            message: 'Failed to add note',
            data: error.message
          });
        } else {
          res.status(200).json({
            success: true,
            message: 'Note added successfully',
            data: note
          });
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
    // update note
    const note = await NotesModel.findById(req.params.id);
    if (!note) {
      res.status(404).json({
        success: false,
        message: 'Note not found',
        data: null
      });
    } else {
      if (note.user.toString() !== req.user.id) {
        res.status(401).json({
          success: false,
          message: 'Authentication failed',
          data: null
        });
      } else {
        const result = await NotesModel.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.status(200).json({
          success: true,
          message: 'Note updated successfully',
          data: result
        });
      }
    }

  }

  deleteNote = async (req, res) => {
    // delete note
    const note = await NotesModel.findById(req.params.id);
    if (!note) {
      res.status(404).json({
        success: false,
        message: 'Note not found',
        data: null
      });
    } else {
      if (note.user.toString() !== String(req.user.id)) {
        res.status(401).json({
          success: false,
          message: 'Authentication failed',
          data: null
        });
      } else {
        const result = await NotesModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
          success: true,
          message: 'Note deleted successfully',
          data: result
        });
      }
    }
  }
}

export default NoteController;