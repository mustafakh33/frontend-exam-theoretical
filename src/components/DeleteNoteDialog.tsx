import React from 'react';
import { Note } from '../types';
import styles from '../styles/DeleteNoteDialog.module.css';

interface DeleteNoteDialogProps {
  note: Note;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteNoteDialog: React.FC<DeleteNoteDialogProps> = ({ 
  note, 
  onConfirm, 
  onCancel 
}) => {
  return (
    <div className={styles.dialogBackdrop}>
      <div className={styles.dialogContent}>
        <div className={styles.dialogHeader}>
          <h5 className={styles.dialogTitle}>Delete Note</h5>
          <button 
            type="button" 
            className={styles.closeButton}
            onClick={onCancel}
          >
            &times;
          </button>
        </div>
        
        <div className="mb-4">
          <p>Are you sure you want to delete this note?</p>
          <p className={styles.noteTitle}>"{note.title}"</p>
          <p className="text-muted">This action cannot be undone.</p>
        </div>
        
        <div className="d-flex justify-content-end">
          <button 
            type="button" 
            className="btn btn-secondary me-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            type="button" 
            className="btn btn-danger"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteNoteDialog;