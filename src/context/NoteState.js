import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const noteFirst = [];
  const [notes, setNotes] = useState(noteFirst);
  const addNote = async (title, description, tag) => {
    const response = await fetch(`/api/notes/createnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  }

  const getNote = async () => {
    const response = await fetch(`/api/notes/fetchnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const data = await response.json();
    setNotes(data);
  }

  const deleteNote = async (id) => {
    const response = await fetch(`/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const data = await response.json();
    console.log(data);
    const newNote = notes.filter((note) => { return note._id !== id });
    setNotes(newNote);
  }

  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const data = await response.json(); 
    console.log(data);
     let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  }
  return (
    <NoteContext.Provider value={{ notes, getNote, addNote, deleteNote, editNote}}>
      {props.children}
    </NoteContext.Provider>

  )
}

export default NoteState;