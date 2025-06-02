import styles from './HamburgerIcon.module.css';

interface HamburgerIconProps {
  onClick: () => void;
}

export default function HamburgerIcon({ onClick }: HamburgerIconProps) {
  return (
    <div className={styles.hamburger} onClick={onClick}>
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
    </div>
  );
}
