// Import necessary hooks from React
import { useState } from "react";
// Import the context we created
import NoteContext from "./noteContext";

// NoteState component that will wrap the application and provide context
const NoteState = (props) => {
  // Provide the state and update function to all children components
  return (
    <NoteContext.Provider value={{}}>{props.children}</NoteContext.Provider>
  );
};

// Export the NoteState component
export default NoteState;
