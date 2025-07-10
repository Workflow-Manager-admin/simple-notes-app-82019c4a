import React from "react";

// PUBLIC_INTERFACE
// Sidebar for note list
export default function NotesSidebar({ notes, onSelect, selectedId, onAdd }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>📝 Notes</h1>
        <button className="add-note-btn" title="Add note" onClick={onAdd}>
          +
        </button>
      </div>
      <ul className="notes-list">
        {notes.length === 0 && (
          <li className="notes-empty">No notes yet</li>
        )}
        {notes.map((note) => (
          <li
            key={note.id}
            className={
              "note-list-item" + (note.id === selectedId ? " selected" : "")
            }
            onClick={() => onSelect(note.id)}
            tabIndex={0}
            aria-selected={selectedId === note.id}
          >
            <div className="note-title">{note.title || <i>Untitled</i>}</div>
            <div className="note-preview">
              {(note.content || "").substring(0, 30)}
              {(note.content || "").length > 30 ? "…" : ""}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
