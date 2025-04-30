import React from 'react';
import styles from '../styles/EmptyState.module.css';

interface EmptyStateProps {
  message: string;
  onAddClick: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message, onAddClick }) => {
  return (
    <div className={styles.emptyState}>
      <div className={styles.content}>
        <div className={styles.icon}>
          <i className="bi bi-journal-text"></i>
        </div>
        <h4>{message}</h4>
        <p>Create your first note to get started</p>
        <button 
          className="btn btn-primary mt-3"
          onClick={onAddClick}
        >
          <i className="bi bi-plus-lg me-1"></i> Add a Note
        </button>
      </div>
    </div>
  );
};

export default EmptyState;