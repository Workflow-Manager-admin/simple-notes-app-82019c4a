import React, { useState, useRef, useEffect } from "react";

// PUBLIC_INTERFACE
// Note add/edit form, used for both creating and modifying notes
export default function NoteEditor({ note, onSave, onCancel }) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const contentRef = useRef(null);

  useEffect(() => {
    contentRef.current?.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      ...note,
      title: title.trim(),
      content: content.trim(),
    });
  }

  return (
    <div className="editor-backdrop">
      <form className="note-editor" onSubmit={handleSubmit}>
        <h2>{note?.id ? "Edit Note" : "New Note"}</h2>
        <label>
          Title
          <input
            className="editor-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            maxLength={100}
            autoFocus
          />
        </label>
        <label>
          Content
          <textarea
            className="editor-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter note content..."
            rows={7}
            ref={contentRef}
          />
        </label>
        <div className="editor-actions">
          <button
            className="save-btn"
            type="submit"
            style={{ background: "var(--accent)" }}
          >
            Save
          </button>
          <button
            className="cancel-btn"
            type="button"
            style={{ background: "var(--secondary)" }}
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
