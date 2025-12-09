import { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import AlertContext from "../context/alert/AlertContext";

const Addnote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const { showAlert } = useContext(AlertContext);
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const HandleClick = async (e) => {
    e.preventDefault();
    // client-side validation before calling API
    if (!note.title || note.title.trim().length < 3) {
      showAlert("Title must be at least 3 characters", "danger");
      return;
    }
    if (!note.description || note.description.trim().length < 5) {
      showAlert("Description must be at least 5 characters", "danger");
      return;
    }

    const result = await addNote(note);
    if (result && result.success) {
      setNote({ title: "", description: "", tag: "" });
      showAlert("Note added successfully", "success");
    } else {
      showAlert(result?.error || "Failed to add note", "danger");
    }
  };
  return (
    <div>
      <div className="container my-3">
        <h1>Add a Note</h1>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              value={note.title}
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              value={note.description}
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              value={note.tag}
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
            />
          </div>
          <button
            type="submit"
            onClick={HandleClick}
            className="btn btn-primary"
            disabled={
              note.title.trim().length < 3 || note.description.trim().length < 5
            }
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addnote;
