import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span>© {new Date().getFullYear()} Portfolio</span>
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>
  );
}
