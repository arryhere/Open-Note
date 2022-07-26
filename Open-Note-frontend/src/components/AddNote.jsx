import React, { useState, useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

export default function AddNote() {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: '', description: '', tag: 'general' })
  const handleAddNote = (e) => {
    e.preventDefault()
    if (note.description !== '' && note.title !== '') {
      addNote(note.title, note.description, note.tag)
    }
    else if (note.description !== '' && note.title === '') {
      addNote('No Title', note.description, note.tag)
    }
    setNote({ title: '', description: '', tag: '' })
  }
  const handleReset = () => {
    setNote({ title: '', description: '', tag: '' })
  }
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className='my-3'>
        <div className="mb-3">
          <input onChange={handleChange} type="email" className="form-control input-text-light"
            id="note-title" placeholder="enter your note title"
            name="title" value={note.title} />
        </div>
        <div className="mb-3">
          <textarea onChange={handleChange} className="form-control input-text-light"
            id="note-description" rows="3" placeholder="enter your note description"
            name="description" value={note.description}></textarea>
        </div>
        <div className="mb-3">
          <button onClick={handleAddNote} type="button" className="btn btn-sm btn-light me-1">Add Note</button>
          <button onClick={handleReset} type="button" className="btn btn-sm btn-light me-1">Reset</button>
        </div>
      </div>
    </>
  )
}
