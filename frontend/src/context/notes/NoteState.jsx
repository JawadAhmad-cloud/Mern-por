// Import necessary hooks from React
import { useState } from "react";
// Import the context we created
import NoteContext from "./noteContext";

// NoteState component that will wrap the application and provide context
const NoteState = (props) => {
  // Initialize state using useState hook with an object containing name and class
  const [state, setState] = useState({
    name: "Harry",
    class: "5b",
  });

  // Function to update the state after a 1 second delay
  const update = () => {
    setTimeout(() => {
      setState({
        name: "Larry",
        class: "10b",
      });
    }, 1000);
  };

  // Provide the state and update function to all children components
  return (
    <NoteContext.Provider value={{ state, update }}>
      {props.children}
    </NoteContext.Provider>
  );
};

// Export the NoteState component
export default NoteState;
