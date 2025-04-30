import { NoteCategory } from "../types";
import styles from "../styles/NavTabs.module.css";

interface NavTabsProps {
  activeCategory: NoteCategory | "ALL";
  setActiveCategory: (category: NoteCategory | "ALL") => void;
  showOnlyCompleted: boolean;
  setShowOnlyCompleted: (value: boolean) => void;
}

const NavTabs: React.FC<NavTabsProps> = ({
  activeCategory,
  setActiveCategory,
  showOnlyCompleted,
  setShowOnlyCompleted,
}) => {
  return (
    <div className={styles.navContainer}>
      <div className={styles.navPillsWrapper}>
        <ul className={styles.navPills}>
          <li className={styles.navItem}>
            <button
              className={`${styles.navLink} ${
                activeCategory === "ALL" ? styles.active : ""
              }`}
              onClick={() => setActiveCategory("ALL")}
            >
              ALL
            </button>
          </li>
          <li className={styles.navItem}>
            <button
              className={`${styles.navLink} ${
                activeCategory === "Personal" ? styles.active : ""
              }`}
              onClick={() => setActiveCategory("Personal")}
            >
              PERSONAL
            </button>
          </li>
          <li className={styles.navItem}>
            <button
              className={`${styles.navLink} ${
                activeCategory === "Home" ? styles.active : ""
              }`}
              onClick={() => setActiveCategory("Home")}
            >
              HOME
            </button>
          </li>
          <li className={styles.navItem}>
            <button
              className={`${styles.navLink} ${
                activeCategory === "Business" ? styles.active : ""
              }`}
              onClick={() => setActiveCategory("Business")}
            >
              BUSINESS
            </button>
          </li>
        </ul>
      </div>

      <div className={styles.checkboxContainer}>
        <input
          className={styles.checkbox}
          type="checkbox"
          id="showCompletedOnly"
          checked={showOnlyCompleted}
          onChange={(e) => setShowOnlyCompleted(e.target.checked)}
        />
        <label className={styles.checkboxLabel} htmlFor="showCompletedOnly">
          Show only completed notes
        </label>
      </div>
    </div>
  );
};

export default NavTabs;