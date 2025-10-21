// Import necessary components and modules from react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import custom components
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
// Import the NoteState context provider
import NoteState from "./context/notes/NoteState";

// Main App component
const App = () => {
  return (
    <>
      {/* NoteState wrapper provides context to child components */}
      <NoteState>
        {/* Router component enables routing functionality */}
        <Router>
          {/* Navigation bar component */}
          <Navbar />
          {/* Routes container for different pages */}
          <Routes>
            {/* Home page route */}
            <Route path="/" element={<Home />} />
            {/* About page route */}
            <Route path="/about" element={<About />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
};

export default App;
