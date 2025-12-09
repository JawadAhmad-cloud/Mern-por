// Import necessary hooks from React
import { useState, useCallback } from "react";
// Import the context we created
import NoteContext from "./noteContext";

// NoteState component that will wrap the application and provide context
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // Get auth token helper
  const getAuthToken = () => {
    try {
      return localStorage.getItem("token");
    } catch (e) {
      return null;
    }
  };

  //get all notes
  const getNotes = useCallback(async () => {
    const token = getAuthToken();
    if (!token) {
      setNotes([]);
      return { success: false, error: "No auth token" };
    }
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      if (response.status === 401) {
        setNotes([]);
        return { success: false, error: "Unauthorized" };
      }
      if (!response.ok) {
        const txt = await response.text();
        console.error("getNotes failed:", response.status, txt);
        setNotes([]);
        return { success: false, error: txt || response.statusText };
      }
      const json = await response.json();
      setNotes(Array.isArray(json) ? json : []);
      return { success: true, data: json };
    } catch (err) {
      console.error("Failed to fetch notes:", err.message || err);
      setNotes([]);
      return { success: false, error: err.message || "Network error" };
    }
  }, []);

  //add a note
  const addNote = useCallback(async ({ title, description, tag }) => {
    const token = getAuthToken();
    if (!token) return { success: false, error: "No auth token" }; // not authenticated
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        // try to parse json error
        let errMsg = response.statusText;
        try {
          const errJson = await response.json();
          if (errJson) {
            if (errJson.errors && Array.isArray(errJson.errors)) {
              errMsg = errJson.errors.map((e) => e.msg).join(", ");
            } else if (errJson.error) {
              errMsg = errJson.error;
            } else if (errJson.message) {
              errMsg = errJson.message;
            } else {
              errMsg = JSON.stringify(errJson);
            }
          }
        } catch (e) {
          // ignore JSON parse error
        }
        console.error("addNote failed:", response.status, errMsg);
        return { success: false, error: errMsg };
      }

      const savedNote = await response.json();
      setNotes((prev) => prev.concat(savedNote));
      return { success: true, note: savedNote };
    } catch (err) {
      console.error("Failed to add note:", err.message || err);
      return { success: false, error: err.message || "Network error" };
    }
  }, []);
  //delete a note
  const deleteNote = useCallback(async (id) => {
    //todo:api call
    const token = getAuthToken();
    if (!token) return;
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      if (!response.ok) {
        const txt = await response.text();
        console.error("deleteNote failed:", response.status, txt);
        return { success: false, error: txt || response.statusText };
      }
      setNotes((prev) => prev.filter((note) => note._id !== id));
      return { success: true };
    } catch (err) {
      console.error("Failed to delete note:", err.message || err);
      return { success: false, error: err.message || "Network error" };
    }
  }, []);
  //edit a note
  const editNote = useCallback(async (id, title, description, tag) => {
    //apicall
    const token = getAuthToken();
    if (!token) return;
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ title, description, tag }),
      });
      if (!response.ok) {
        const txt = await response.text();
        console.error("editNote failed:", response.status, txt);
        return { success: false, error: txt || response.statusText };
      }
      const json = await response.json();

      //logic to edit in client
      setNotes((prev) => {
        const newNotes = JSON.parse(JSON.stringify(prev));
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if (element._id === id) {
            element.title = title;
            element.description = description;
            element.tag = tag;
            break;
          }
        }
        return newNotes;
      });
      return { success: true, note: json.note || null };
    } catch (err) {
      console.error("Failed to edit note:", err.message || err);
      return { success: false, error: err.message || "Network error" };
    }
  }, []);

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
