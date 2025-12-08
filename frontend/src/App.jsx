// Import necessary components and modules from react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import custom components
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
// Import the NoteState context provider
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

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
          <Alert message="this is a good course" />
          <div className="container">
            {/* Routes container for different pages */}
            <Routes>
              {/* Home page route */}
              <Route path="/" element={<Home />} />
              {/* About page route */}
              <Route path="/about" element={<About />} />
              {/* Login and Signup routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
};

export default App;
