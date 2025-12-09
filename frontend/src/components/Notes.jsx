import { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });
  const [showModal, setShowModal] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // getNotes is stable (memoized in NoteState), so it's safe to include
    // it in the dependency array — this calls getNotes once on mount.
    getNotes();
  }, [getNotes]);

  const updateNote = (currentNote) => {
    setShowModal(true);
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const HandleClick = (e) => {
    setIsAnimating(true);
    editNote(note.id, note.etitle, note.edescription, note.etag);
    setTimeout(() => {
      setShowModal(false);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <>
      <Addnote />
      {(showModal || isAnimating) && (
        <div className="modal-backdrop fade show"></div>
      )}
      <div
        className={`modal fade ${showModal && !isAnimating ? "show" : ""}`}
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        style={{
          display: showModal || isAnimating ? "block" : "none",
          animation:
            showModal && !isAnimating
              ? "slideDown 0.3s ease-out"
              : "slideDown 0.3s ease-out reverse",
        }}
      >
        <style>{`
          @keyframes slideDown {
            from {
              transform: translateY(-50px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}</style>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Editing Note</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  setIsAnimating(true);
                  setTimeout(() => {
                    setShowModal(false);
                    setIsAnimating(false);
                  }, 300);
                }}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    required={true}
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={note.etitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    required={true}
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={note.edescription}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setIsAnimating(true);
                  setTimeout(() => {
                    setShowModal(false);
                    setIsAnimating(false);
                  }, 300);
                }}
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
                onClick={HandleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Notes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>Your Notes</h1>
        {notes.length === 0 ? "No notes to display" : ""}
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
