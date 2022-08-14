import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
import ThemeContext from '../context/theme/ThemeContext';

export default function NoteCard(props) {
  const themeContext = useContext(ThemeContext);
  const { getTheme } = themeContext;
  const theme = getTheme();
  const altTheme = theme === 'light' ? 'dark' : 'light';

  const noteContext = useContext(NoteContext);
  const { deleteNote } = noteContext;
  const { note, editModalNote } = props

  return (
    <>
      <div className={`card card-${theme} border-${theme === 'light' ? 'muted' : 'white'} border-opacity-25 bg-${theme} m-2`} style={{ width: '15rem' }}>
        <div className={`card-body`}>
          <h5 className={`card-title text-${altTheme}`}>{note.title}</h5>
          <p className={`card-text text-${altTheme} my-2`}>{note.description}</p>
          <div className='d-flex justify-content-end align-items-center'>
            <div className={`icons hover-${theme} d-flex justify-content-center align-items-center`}
              onClick={() => { editModalNote(note) }}>
              <i className={`bi bi-pencil-square fs-5 text-${altTheme}`}></i>
            </div>
            <div className={`icons hover-${theme} d-flex justify-content-center align-items-center`}
              onClick={() => { deleteNote(note._id) }}>
              <i className={`bi bi-trash fs-5 text-${altTheme}`}></i>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
