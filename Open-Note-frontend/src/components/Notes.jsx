import React, { useState, useContext, useEffect, useRef } from 'react'
import NoteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import NoteCard from './NoteCard';

export default function Notes() {
  const noteContext = useContext(NoteContext);
  const { notes, getAllNotes, editNote } = noteContext;
  const [note, setNote] = useState({ _id: "", edited_title: "", edited_description: "" });
  const ref = useRef(null);

  useEffect(() => {
    getAllNotes();
    // eslint-disable-next-line
  }, [])

  const editModalNote = (currentNote) => {
    ref.current.click();
    setNote({ _id: currentNote._id, edited_title: currentNote.title, edited_description: currentNote.description })
  }

  const handleClick = (e) => {
    if (note.edited_title === '') {
      editNote(note._id, 'No Title', note.edited_description)
    } else {
      editNote(note._id, note.edited_title, note.edited_description)
    }
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div>
        <button ref={ref} type="button" className="btn btn-primary d-none"
          data-bs-toggle="modal" data-bs-target="#editNoteModal"></button>
        <div className="modal fade" id="editNoteModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <form className="my-3">
                  <div className="mb-3">
                    <input onChange={onChange} type="text" className="form-control input-text-light"
                      id="edited_title" name="edited_title" value={note.edited_title}
                      placeholder="enter your note title" />
                  </div>
                  <div className="mb-3">
                    <textarea onChange={onChange} className="form-control input-text-light"
                      id="note-edited_description" rows="3" placeholder="enter your note description"
                      name="edited_description" value={note.edited_description}></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button disabled={note.edited_description.length < 1} onClick={handleClick}
                  type="button" className="btn btn-sm btn-light" data-bs-dismiss="modal">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddNote />
      <hr />
      <div className="d-flex justify-content-center align-items-center flex-wrap">
        <div className="my-3 text-muted d-flex justify-content-center align-items-center flex-wrap">
          {notes.length === 0 && `it's quiet empty in here add a note`}
        </div>
        {notes.map((note) => {
          return <NoteCard key={note._id} editModalNote={editModalNote} note={note} />
        })}
      </div>
    </>
  )
}