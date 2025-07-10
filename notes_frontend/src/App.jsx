import React, { useEffect, useState } from "react";
import NotesSidebar from "./NotesSidebar";
import NoteEditor from "./NoteEditor";
import NoteViewer from "./NoteViewer";

// Styled app-level CSS variables for theme colors
const PRIMARY = "#1a73e8";
const ACCENT = "#34a853";
const SECONDARY = "#fbbc04";

// Util: Save notes to localStorage
function setNotesToStorage(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Util: Fetch notes from localStorage
function getNotesFromStorage() {
  const n = localStorage.getItem("notes");
  return n ? JSON.parse(n) : [];
}

// PUBLIC_INTERFACE
// Top-level notes app, controlling state and rendering logic
export default function App() {
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  // Load notes at startup
  useEffect(() => {
    setNotes(getNotesFromStorage());
  }, []);

  // Whenever notes change, persist to storage
  useEffect(() => {
    setNotesToStorage(notes);
  }, [notes]);

  // Select a note for viewing
  function handleSelect(id) {
    setSelectedId(id);
    setShowEditor(false);
    setEditingNote(null);
  }

  // Add a new note
  function handleAddNote() {
    setEditingNote({ id: null, title: "", content: "" });
    setShowEditor(true);
  }

  // Edit current note
  function handleEditNote() {
    const n = notes.find((x) => x.id === selectedId);
    setEditingNote(n);
    setShowEditor(true);
  }

  // Delete current note
  function handleDeleteNote(id) {
    if (!window.confirm("Delete this note?")) return;
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  // Save note (add new or update)
  function handleSave(note) {
    if (!note.title.trim() && !note.content.trim()) {
      setShowEditor(false);
      setEditingNote(null);
      return;
    }
    if (note.id == null) {
      // New note
      const id = Date.now().toString();
      const newNote = { ...note, id };
      setNotes([newNote, ...notes]);
      setSelectedId(id);
    } else {
      // Update
      setNotes((prev) =>
        prev.map((n) => (n.id === note.id ? { ...n, ...note } : n))
      );
      setSelectedId(note.id);
    }
    setShowEditor(false);
    setEditingNote(null);
  }

  // Cancel add or edit
  function handleCancel() {
    setShowEditor(false);
    setEditingNote(null);
  }

  // Responsive layout
  return (
    <div
      className="notes-app-container"
      style={{
        "--primary": PRIMARY,
        "--accent": ACCENT,
        "--secondary": SECONDARY,
      }}
    >
      <NotesSidebar
        notes={notes}
        onSelect={handleSelect}
        selectedId={selectedId}
        onAdd={handleAddNote}
      />
      <main className="main-area">
        {showEditor ? (
          <NoteEditor
            note={editingNote}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : selectedId ? (
          <NoteViewer
            note={notes.find((n) => n.id === selectedId)}
            onEdit={handleEditNote}
            onDelete={() => handleDeleteNote(selectedId)}
          />
        ) : (
          <div className="empty-message">
            <h2>No Note Selected</h2>
            <p>Select a note or create a new one to get started!</p>
            <button className="add-note-btn" onClick={handleAddNote}>
              + New Note
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
