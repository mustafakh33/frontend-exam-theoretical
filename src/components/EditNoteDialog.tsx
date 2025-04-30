import React, { useState, useEffect } from 'react';
import { Note, NoteFormData } from '../types';
import styles from '../styles/EditNoteDialog.module.css';

interface EditNoteDialogProps {
  note: Note;
  onSave: (formData: NoteFormData) => void;
  onCancel: () => void;
}

const EditNoteDialog: React.FC<EditNoteDialogProps> = ({ 
  note, 
  onSave, 
  onCancel 
}) => {
  const [formData, setFormData] = useState<NoteFormData>({
    title: note.title,
    description: note.description,
    category: note.category
  });
  
  const [errors, setErrors] = useState({
    title: '',
    description: ''
  });
  
  useEffect(() => {
    setFormData({
      title: note.title,
      description: note.description,
      category: note.category
    });
  }, [note]);
  
  const validateForm = (): boolean => {
    const newErrors = {
      title: '',
      description: ''
    };
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (formData.description.length > 200) {
      newErrors.description = 'Description cannot exceed 200 characters';
    }
    
    setErrors(newErrors);
    return !newErrors.title && !newErrors.description;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className={styles.dialogBackdrop}>
      <div className={styles.dialogContent}>
        <div className={styles.dialogHeader}>
          <h5 className={styles.dialogTitle}>Edit Note</h5>
          <button 
            type="button" 
            className={styles.closeButton}
            onClick={onCancel}
          >
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="edit-title" className="form-label">Title</label>
            <input
              type="text"
              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
              id="edit-title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
          </div>
          
          <div className="mb-3">
            <label htmlFor="edit-description" className="form-label">Description</label>
            <textarea
              className={`form-control ${errors.description ? 'is-invalid' : ''}`}
              id="edit-description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            <div className={styles.charCount}>
              {formData.description.length}/200
            </div>
            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
          </div>
          
          <div className="mb-4">
            <label htmlFor="edit-category" className="form-label">Category</label>
            <select
              className="form-select"
              id="edit-category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Personal">Personal</option>
              <option value="Home">Home</option>
              <option value="Business">Business</option>
            </select>
          </div>
          
          <div className="d-flex justify-content-end">
            <button 
              type="button" 
              className="btn btn-secondary me-2"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNoteDialog;