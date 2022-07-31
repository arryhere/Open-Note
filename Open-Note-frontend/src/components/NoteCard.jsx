import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

export default function NoteCard(props) {
  const noteContext = useContext(NoteContext);
  const { deleteNote } = noteContext;
  const { note, editModalNote } = props
  return (
    <>
      <div className="card border-muted m-2" style={{ width: '15rem' }}>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text my-2">{note.description}</p>
          <div className='d-flex justify-content-end align-items-center'>
            <div className={`icons hover-light d-flex justify-content-center align-items-center`}
              onClick={() => { editModalNote(note) }}>
              <i className={`bi bi-pencil-square fs-5 text-dark`}></i>
            </div>
            <div className={`icons hover-light d-flex justify-content-center align-items-center`}
              onClick={() => { deleteNote(note._id) }}>
              <i className={`bi bi-trash fs-5 text-dark`}></i>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
