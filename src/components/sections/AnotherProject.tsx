import Image from "next/image";
import styles from "./AnotherProject.module.scss";

export function AnotherProject() {
  return (
    <section className={styles.section} aria-labelledby="another-project-title">
      <h2 className={styles.title} id="another-project-title">
        Another Project
      </h2>

      <Image
        className={styles.artwork}
        src="/pt_img/el05.svg"
        alt=""
        width={152}
        height={204}
      />

      <article className={styles.projectCard}>
        <div className={styles.imagePlaceholder} aria-label="프로젝트 이미지 영역" />
        <h3>
          Shopping
          <br />
          Mall
        </h3>
      </article>

      <div className={styles.nextProject} aria-hidden="true">
        <div className={styles.nextPlaceholder} />
      </div>
    </section>
  );
}
