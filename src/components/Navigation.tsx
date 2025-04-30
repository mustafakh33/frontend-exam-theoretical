import { Search, Plus } from "lucide-react";
import styles from "../styles/Navigation.module.css";

interface NavigationProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onAddClick: () => void;
}

export default function Navigation({
  searchTerm,
  onSearchChange,
  onAddClick,
}: NavigationProps) {
  return (
    <div className={styles.header}>
      <div className="container">
        <div className={styles.navigation}>
          <div className={styles.container}>
            <div className={styles.searchIconContainer}>
              <Search size={18} className={styles.searchIcon} />
            </div>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <button
            className={styles.addButton}
            type="button"
            onClick={onAddClick}
          >
            <Plus size={18} className={styles.addIcon} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
