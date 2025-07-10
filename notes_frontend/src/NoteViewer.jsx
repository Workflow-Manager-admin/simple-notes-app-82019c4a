import React from "react";

// PUBLIC_INTERFACE
// Displays the note, with edit and delete actions
export default function NoteViewer({ note, onEdit, onDelete }) {
  if (!note) return null;
  return (
    <section className="note-viewer">
      <div className="note-view-header">
        <h2>{note.title || <i>Untitled Note</i>}</h2>
        <div>
          <button className="icon-btn" onClick={onEdit} title="Edit">
            ✏️
          </button>
          <button className="icon-btn" onClick={onDelete} title="Delete">
            🗑️
          </button>
        </div>
      </div>
      <article>
        <pre className="note-content">{note.content || <i>(Empty note)</i>}</pre>
      </article>
    </section>
  );
}
