import styles from "./Header.module.scss";

const links = [
  { label: "Main", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
  { label: "About Me", href: "#about" },
];

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.brand} href="#home">
          Yu Ji Yeong
        </a>
        <nav className={styles.nav} aria-label="주요 메뉴">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
