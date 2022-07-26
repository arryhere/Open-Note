import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const initialNotes = [
    {
      "_id": "62ddbfdd14c2c352114060c01",
      "user": "62dd748a34f895c2e11a8b6e",
      "title": "My Title",
      "description": "This is a note",
      "tag": "General",
      "createdAt": "2022-07-24T21:55:41.696Z",
      "updatedAt": "2022-07-24T21:55:41.696Z",
      "__v": 0
    },
    {
      "_id": "62ddbfdd14c2c352114060c02",
      "user": "62dd748a34f895c2e11a8b6e",
      "title": "My Title",
      "description": "This is a note",
      "tag": "General",
      "createdAt": "2022-07-24T21:55:41.696Z",
      "updatedAt": "2022-07-24T21:55:41.696Z",
      "__v": 0
    },
    {
      "_id": "62ddbfdd14c2c352114060c03",
      "user": "62dd748a34f895c2e11a8b6e",
      "title": "My Title",
      "description": "This is a note",
      "tag": "General",
      "createdAt": "2022-07-24T21:55:41.696Z",
      "updatedAt": "2022-07-24T21:55:41.696Z",
      "__v": 0
    },
    {
      "_id": "62ddbfdd14c2c352114060c04",
      "user": "62dd748a34f895c2e11a8b6e",
      "title": "My Title",
      "description": "This is a note",
      "tag": "General",
      "createdAt": "2022-07-24T21:55:41.696Z",
      "updatedAt": "2022-07-24T21:55:41.696Z",
      "__v": 0
    },
    {
      "_id": "62ddbfde14c2c352114060ca5",
      "user": "62dd748a34f895c2e11a8b6e",
      "title": "My Title",
      "description": "This is a note",
      "tag": "General",
      "createdAt": "2022-07-24T21:55:42.377Z",
      "updatedAt": "2022-07-24T21:55:42.377Z",
      "__v": 0
    }
  ]

  const [notes, setNotes] = useState(initialNotes)

  const addNote = (title, description, tag) => {
    const note = {
      "_id": "62ddbfde14c2c352114060ca5",
      "user": "62dd748a34f895c2e11a8b6e",
      "title": title,
      "description": description,
      "tag": tag,
      "createdAt": "2022-07-24T21:55:42.377Z",
      "updatedAt": "2022-07-24T21:55:42.377Z",
      "__v": 0
    }
    setNotes(notes.concat(note))
  }

  const deleteNote = (_id) => {
    console.log(_id);
    const newNotes = notes.filter((e) => {
      return e._id !== _id
    })
    setNotes(newNotes)
  }
  const updateNote = (_id, title, description, tag) => {

  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;