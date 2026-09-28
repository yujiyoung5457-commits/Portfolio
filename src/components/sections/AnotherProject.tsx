import Image from "next/image";
import styles from "./AnotherProject.module.scss";

export function AnotherProject() {
  return (
    <section
      className={styles.section}
      id="another-project"
      aria-labelledby="another-project-title"
    >
      <div className={styles.wave} aria-hidden="true">
        <Image
          className={styles.waveImage}
          src="/pt_img/power02.svg"
          alt=""
          width={7317}
          height={2249}
        />
      </div>

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
        <div className={`${styles.mobilePreview} ${styles.shoppingPreview}`}>
          <Image
            src="/reactShoppingmall-cotti.png"
            alt=""
            fill
            sizes="(max-width: 375px) 70vw, 1px"
          />
        </div>
        <div className={styles.imagePlaceholder} aria-label="프로젝트 이미지 영역" />
        <h3>
          Shopping
          <br />
          Mall
        </h3>
      </article>

      <article className={styles.projectCard02}>
        <div className={`${styles.mobilePreview} ${styles.hamsterPreview}`}>
          <Image
            src="/hamstercareImg.png"
            alt=""
            fill
            sizes="(max-width: 375px) 24vw, 1px"
          />
        </div>
        <Image
          className={styles.projectCardBackground02}
          src="/section01_background06.webp"
          alt=""
          fill
          sizes="(max-width: 520px) 32vw, (max-width: 800px) 30vw, 32rem"
        />
        <div className={styles.imagePlaceholder02} aria-label="프로젝트 이미지 영역" />
        <h3>
          Hamster
          <br />
          Care Game
        </h3>
      </article>

      <div className={styles.nextProject} aria-hidden="true">
        <div className={styles.nextPlaceholder} />
      </div>
    </section>
  );
}
