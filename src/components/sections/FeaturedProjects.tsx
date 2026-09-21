import Image from "next/image";
import styles from "./FeaturedProjects.module.scss";

export function FeaturedProjects() {
  return (
    <section
      className={styles.section}
      id="projects"
      aria-labelledby="projects-title"
    >
      <Image
        className={styles.leftArtwork}
        src="/pt_img/el03.svg"
        alt=""
        width={113}
        height={169}
      />

      <div className={styles.center}>
        <h2 className={styles.title} id="projects-title">
          <span>Selected</span>
          <span>Projects</span>
        </h2>
        <span className={styles.go}>Go</span>
      </div>

      <span className={styles.dot} aria-hidden="true" />

      <Image
        className={styles.rightArtwork}
        src="/pt_img/el03.svg"
        alt=""
        width={113}
        height={169}
      />
    </section>
  );
}
