import React from 'react';
import { Note } from '../types';
import NoteCard from './NoteCard';
import styles from '../styles/NoteList.module.css';

interface NoteListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
  onToggleComplete: (id: string) => void;
}

const NoteList: React.FC<NoteListProps> = ({ 
  notes, 
  onEdit, 
  onDelete,
  onToggleComplete
}) => {
  return (
    <div className={styles.noteList}>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {notes.map(note => (
          <div key={note.id} className="col">
            <NoteCard 
              note={note} 
              onEdit={onEdit} 
              onDelete={onDelete}
              onToggleComplete={onToggleComplete}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteList;