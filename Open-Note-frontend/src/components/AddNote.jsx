import React, { useState, useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';
import ThemeContext from '../context/theme/ThemeContext';

export default function AddNote() {
  const themeContext = useContext(ThemeContext);
  const { getTheme } = themeContext;
  const theme = getTheme();
  const altTheme = theme === 'light' ? 'dark' : 'light';

  const noteContext = useContext(NoteContext);
  const { addNote } = noteContext;

  const [note, setNote] = useState({ title: '', description: '' })

  const handleInputChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const handleAddNote = (e) => {
    e.preventDefault()
    if (note.title === '') {
      addNote('No Title', note.description);
      setNote({ title: "", description: "" })
    } else {
      addNote(note.title, note.description);
      setNote({ title: "", description: "" })
    }
  }

  const handleReset = () => {
    setNote({ title: '', description: '' })
  }

  return (
    <>
      <div className='my-3'>
        <div className="mb-3">
          <input onChange={handleInputChange} type="text" className={`form-control bg-${theme} text-${altTheme} input-text-${theme}`}
            id="note-title" placeholder="enter your note title"
            name="title" value={note.title} />
        </div>
        <div className="mb-3">
          <textarea onChange={handleInputChange} className={`form-control bg-${theme} text-${altTheme} input-text-${theme}`}
            id="note-description" rows="3" placeholder="enter your note description"
            name="description" value={note.description}></textarea>
        </div>
        <div className="mb-3">
          <button className={`btn btn-sm btn-${theme} me-1`} disabled={note.description.length < 1} 
            onClick={handleAddNote} type="button" >Add Note</button>
          <button className={`btn btn-sm btn-${theme} me-1`} onClick={handleReset} type="button" >Reset</button>
        </div>
      </div>
    </>
  )
}
