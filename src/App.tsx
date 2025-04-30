import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Note, NoteCategory, NoteFormData } from "./types";
import { getNotes, saveNotes, formatDate } from "./utils/storage";
import Navigation from "./components/Navigation";
import NoteList from "./components/NoteList";
import EditNoteDialog from "./components/EditNoteDialog";
import DeleteNoteDialog from "./components/DeleteNoteDialog";
import EmptyState from "./components/EmptyState";
import AddNoteDialog from "./components/AddNoteDialog";
import NavTabs from "./components/NavTabs";

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [activeCategory, setActiveCategory] = useState<NoteCategory | "ALL">(
    "ALL"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [showOnlyCompleted, setShowOnlyCompleted] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    const storedNotes = getNotes();
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    let filtered = [...notes];

    // Filter by category
    if (activeCategory !== "ALL") {
      filtered = filtered.filter((note) => note.category === activeCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by completion status
    if (showOnlyCompleted) {
      filtered = filtered.filter((note) => note.completed);
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => {
      const dateA = a.date.split(".").reverse().join("");
      const dateB = b.date.split(".").reverse().join("");
      return dateB.localeCompare(dateA);
    });

    // Move completed notes to the end if not filtering for completed only
    if (!showOnlyCompleted) {
      const completed = filtered.filter((note) => note.completed);
      const notCompleted = filtered.filter((note) => !note.completed);
      filtered = [...notCompleted, ...completed];
    }

    setFilteredNotes(filtered);
  }, [notes, activeCategory, searchTerm, showOnlyCompleted]);

  const handleAddNote = (formData: NoteFormData) => {
    const newNote: Note = {
      id: Date.now().toString(),
      ...formData,
      date: formatDate(new Date()),
      completed: false,
    };

    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
    setShowAddDialog(false);
  };

  const handleEditNote = (formData: NoteFormData) => {
    if (!selectedNote) return;

    const updatedNotes = notes.map((note) =>
      note.id === selectedNote.id ? { ...note, ...formData } : note
    );

    setNotes(updatedNotes);
    saveNotes(updatedNotes);
    setShowEditDialog(false);
    setSelectedNote(null);
  };

  const handleDeleteNote = () => {
    if (!selectedNote) return;

    const updatedNotes = notes.filter((note) => note.id !== selectedNote.id);
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
    setShowDeleteDialog(false);
    setSelectedNote(null);
  };

  const handleToggleComplete = (noteId: string) => {
    const updatedNotes = notes.map((note) =>
      note.id === noteId ? { ...note, completed: !note.completed } : note
    );

    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column "
      style={{ background: "#d8d8d8" }}
    >
      <Navigation
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={() => setShowAddDialog(true)}
      />
      <div className="container">
        <div className="mb-4">
          <h2 className="mb-3" style={{ fontSize: "25px", fontWeight: "bold" }}>
            Your notes
          </h2>
          <NavTabs
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            showOnlyCompleted={showOnlyCompleted}
            setShowOnlyCompleted={setShowOnlyCompleted}
          />
        </div>

        {filteredNotes.length > 0 ? (
          <NoteList
            notes={filteredNotes}
            onEdit={(note) => {
              setSelectedNote(note);
              setShowEditDialog(true);
            }}
            onDelete={(note) => {
              setSelectedNote(note);
              setShowDeleteDialog(true);
            }}
            onToggleComplete={handleToggleComplete}
          />
        ) : (
          <EmptyState
            message={
              searchTerm
                ? "No notes found matching your search"
                : "You don't have any notes yet"
            }
            onAddClick={() => setShowAddDialog(true)}
          />
        )}

        {showAddDialog && (
          <AddNoteDialog
            onSave={handleAddNote}
            onCancel={() => setShowAddDialog(false)}
          />
        )}

        {showEditDialog && selectedNote && (
          <EditNoteDialog
            note={selectedNote}
            onSave={handleEditNote}
            onCancel={() => {
              setShowEditDialog(false);
              setSelectedNote(null);
            }}
          />
        )}

        {showDeleteDialog && selectedNote && (
          <DeleteNoteDialog
            note={selectedNote}
            onConfirm={handleDeleteNote}
            onCancel={() => {
              setShowDeleteDialog(false);
              setSelectedNote(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default App;
