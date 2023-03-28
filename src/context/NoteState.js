import React, { useState } from "react";
import NoteContext from "./NoteContext";


// NoteState: Contains functionality to get all notes, add a note, delete notes, and edit notes,
// and reflect those changes in the backend.
const NoteState = (props) => {
  // auth-token
  const jwtToken = localStorage.getItem("token");
  // host url
  const host = "http://localhost:5000";

  // initially empty note
  const noteInit = [];
  let [notes, setNotes] = useState(noteInit);

  // fetch all the notes
  const getAllNotes = async () => {

    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "auth-token": jwtToken
      }
    });
    const json = await response.json();
    setNotes(json);
  }

  // Add a note
  const addNote = async (title, description, tag) => {
    const url = `${host}/api/notes/createnote`;
    const data = { title: title, description: description, tag: tag };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "auth-token": jwtToken
      },
      body: JSON.stringify(data)
    });

    const json = await response.json();
    setNotes(notes.concat(json));
  }

  // Delete a note
  const deleteNote = async (id) => {
    const url = `${host}/api/notes/deleteNote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "auth-token": jwtToken
      }
    });

    setNotes(notes.filter((note) => { return note._id !== id }));
  }

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    const url = `${host}/api/notes/updatenote/${id}`;
    const data = { title: title, description: description, tag: tag };
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "auth-token": jwtToken
      },
      body: JSON.stringify(data)
    });
    const json = await response.json();
    // reflecting change locally
    let newNote = {};
    let newNotes = [];
    for (let note of notes) {
      if (note._id === id) {
        newNote = note;
        newNote.title = title;
        newNote.description = description;
        newNote.tag = tag;
        newNotes.push(newNote);
      } else {
        newNotes.push(note);
      }
      
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;