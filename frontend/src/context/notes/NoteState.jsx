// Import necessary hooks from React
import { useState } from "react";
// Import the context we created
import NoteContext from "./noteContext";

// NoteState component that will wrap the application and provide context
const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "68efa716445505b18c28891f",
      user: "68ee2b25b1bc4fddefe13aac",
      title: "my title",
      description: "Please wake up early",
      tag: "person",
      date: "2025-10-15T13:52:22.805Z",
      __v: 0,
    },
    {
      _id: "68efa716445505b18c28898f",
      user: "68ee2b25b1bc4fddefe13aac",
      title: "my title",
      description: "Please wake up early",
      tag: "person",
      date: "2025-10-15T13:52:22.805Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  //add a note
  const addNote = ({ title, description, tag }) => {
    console.log(title, description, tag);

    let note = {
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
  const deleteNote = (id) => {
    //todo:api call
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };
  //edit a note
  const editNote = () => {};

  // Provide the state and update function to all children components
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

// Export the NoteState component
export default NoteState;
