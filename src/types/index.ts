export type NoteCategory = 'Business' | 'Home' | 'Personal';

export interface Note {
  id: string;
  title: string;
  description: string;
  category: NoteCategory;
  date: string;
  completed: boolean;
}

export interface NoteFormData {
  title: string;
  description: string;
  category: NoteCategory;
}