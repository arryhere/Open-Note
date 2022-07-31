import React, { useState } from "react";
import NoteContext from "./NoteContext";
import config from "../../config/config";

const NoteState = (props) => {
  const hostname = config.backendHostname;
  const port = config.backendPort;
  const URL = `http://${hostname}:${port}`;

  const [notes, setNotes] = useState([])

  const getAllNotes = async () => {
    // api
    const addNoteEndpoint = `${URL}/api/notes/getAllNotes`;
    const response = await fetch(addNoteEndpoint, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      }
    })
    setNotes(await response.json())
  }

  const addNote = async (title, description, tag) => {
    // api
    const addNoteEndpoint = `${URL}/api/notes/addNote`;
    const response = await fetch(addNoteEndpoint, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      },
      body: JSON.stringify({ title, description, tag })   // js shorthand for same key value name
    })
    const noteResult = await response.json()
    // client
    const note = noteResult.data
    setNotes(notes.concat(note))
  }

  const deleteNote = async (_id) => {
    // api
    const deleteNoteEndpoint = `${URL}/api/notes/deleteNote/${_id}`;
    await fetch(deleteNoteEndpoint, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      }
    })
    // client
    const newNotes = notes.filter((e) => {
      return e._id !== _id
    })
    setNotes(newNotes)
  }

  const editNote = async (_id, title, description, tag) => {
    // api
    const editNoteEndpoint = `${URL}/api/notes/editNote/${_id}`;
    await fetch(editNoteEndpoint, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      },
      body: JSON.stringify({ title, description, tag })
    })
    // client
    const newNotes = JSON.parse(JSON.stringify(notes))
    for (const e of newNotes) {
      if (e._id === _id) {
        e.title = title;
        e.description = description;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, getAllNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;