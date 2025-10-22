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
  // Provide the state and update function to all children components
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

// Export the NoteState component
export default NoteState;
