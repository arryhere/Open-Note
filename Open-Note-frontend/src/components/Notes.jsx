import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import NoteCard from './NoteCard';

export default function Notes() {
  const context = useContext(NoteContext);
  const { notes, addNote } = context;
  return (
    <>
      <AddNote />
      <hr/>
      <div className='d-flex justify-content-center align-items-center flex-wrap'>
        {notes.map((e) => {
          return <NoteCard key={e._id} note={e}/>
        })}
      </div>
    </>
  )
}