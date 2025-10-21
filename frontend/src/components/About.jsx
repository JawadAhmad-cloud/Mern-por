// Import necessary dependencies from React
import React, { useEffect } from "react";
import { useContext } from "react";
// Import the note context
import noteContext from "../context/notes/noteContext";

// About component definition
const About = () => {
  // Access the context using useContext hook
  const a = useContext(noteContext);

  // useEffect hook to update the context state when component mounts
  useEffect(() => {
    a.update();
  }, []); // Empty dependency array means this runs once on mount

  // Log the current state to console
  console.log(a.state);

  // Render component with data from context
  return (
    <div>
      this is about {a.state.name} and he is in class {a.state.class}
    </div>
  );
};

// Export the About component
export default About;
