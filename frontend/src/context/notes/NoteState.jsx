// Import necessary hooks from React
import { useState } from "react";
// Import the context we created
import NoteContext from "./noteContext";

// NoteState component that will wrap the application and provide context
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //get all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjkyZWViMDI0NTJkMmQ1MzZmZTliZGI5In0sImlhdCI6MTc2NDY4MjU1MH0.K0YkQqbpR1_10rLLMiwenV1-v20L3O2A2Hs4O-JNa04",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //add a note
  const addNote = async ({ title, description, tag }) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjkyZWViMDI0NTJkMmQ1MzZmZTliZGI5In0sImlhdCI6MTc2NDY4MjU1MH0.K0YkQqbpR1_10rLLMiwenV1-v20L3O2A2Hs4O-JNa04",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = {
      _id: "68efa716445505b18c28891f",
      user: "68ee2b25b1bc4fddefe13aac",
      title: title,
      description: description,
      tag: "person",
      date: "2025-10-15T13:52:22.805Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  //delete a note
  const deleteNote = async (id) => {
    //todo:api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjkyZWViMDI0NTJkMmQ1MzZmZTliZGI5In0sImlhdCI6MTc2NDY4MjU1MH0.K0YkQqbpR1_10rLLMiwenV1-v20L3O2A2Hs4O-JNa04",
      },
    });

    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };
  //edit a note
  const editNote = async (id, title, description, tag) => {
    //apicall
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjkyZWViMDI0NTJkMmQ1MzZmZTliZGI5In0sImlhdCI6MTc2NDY4MjU1MH0.K0YkQqbpR1_10rLLMiwenV1-v20L3O2A2Hs4O-JNa04",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    //logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  // Provide the state and update function to all children components
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

// Export the NoteState component
export default NoteState;
