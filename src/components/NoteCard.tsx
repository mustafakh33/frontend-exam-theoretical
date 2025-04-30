import React from "react";
import { Note } from "../types";
import styles from "../styles/NoteCard.module.css";

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
  onToggleComplete: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
  note,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  const categoryColors = {
    Business: styles.business,
    Home: styles.home,
    Personal: styles.personal,
  };

  return (
    <div
      className={`${styles.noteCard} ${note.completed ? styles.completed : ""}`}
    >
      <div className="d-flex justify-content-between">
        <div
          className={`${styles.categoryBadge} ${categoryColors[note.category]}`}
        >
          {note.category}
        </div>
        <div className="d-flex  align-items-start mb-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={note.completed}
              onChange={() => onToggleComplete(note.id)}
            />
          </div>
          <div className="d-flex">
            <button
              className={`${styles.actionButton} me-2`}
              onClick={() => onEdit(note)}
            >
              <i className="bi bi-pencil"></i>
            </button>
            <button
              className={styles.actionButton}
              onClick={() => onDelete(note)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>

      <h3
        className={`${styles.noteTitle} ${
          note.completed ? styles.strikethrough : ""
        }`}
      >
        {note.title}
      </h3>

      <p
        className={`${styles.noteDescription} ${
          note.completed ? styles.strikethrough : ""
        }`}
      >
        {note.description}
      </p>

      <div className={styles.noteDate}>{note.date}</div>
    </div>
  );
};

export default NoteCard;
