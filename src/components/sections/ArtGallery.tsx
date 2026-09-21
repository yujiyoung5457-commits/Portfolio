import Image from "next/image";
import styles from "./ArtGallery.module.scss";

function ProjectButtons() {
  return (
    <div className={styles.buttons}>
      <span>Site</span>
      <span>Git Hub</span>
    </div>
  );
}

function ArtworkFrame({
  orientation,
  tilted = false,
}: {
  orientation: "landscape" | "portrait";
  tilted?: boolean;
}) {
  const isLandscape = orientation === "landscape";

  return (
    <div
      className={`${styles.frame} ${
        isLandscape ? styles.landscape : styles.portrait
      } ${tilted ? styles.tilted : ""}`}
    >
      <span className={styles.frameWindow} aria-label="작품 이미지 영역" />
      <Image
        src={isLandscape ? "/pt_img/frame01.png" : "/pt_img/frame02.png"}
        alt=""
        fill
        sizes={isLandscape ? "42vw" : "28vw"}
      />
    </div>
  );
}

export function ArtGallery() {
  return (
    <section className={styles.section} aria-labelledby="art-gallery-title">
      <div className={styles.orangePanel} aria-hidden="true" />

      <h2 className={styles.heading} id="art-gallery-title">
        <span>Code +</span> Fine Arts
      </h2>

      <div className={`${styles.textureShape} ${styles.shape1}`} />
      <div className={styles.frame1}>
        <ArtworkFrame orientation="portrait" />
        <ProjectButtons />
      </div>

      <div className={styles.frame2}>
        <ArtworkFrame orientation="landscape" />
        <ProjectButtons />
      </div>
      <div className={`${styles.textureShape} ${styles.shape2}`} />

      <div className={styles.frame3}>
        <ArtworkFrame orientation="portrait" tilted />
        <ProjectButtons />
      </div>
      <div className={`${styles.textureShape} ${styles.shape3}`} />

      <div className={`${styles.textureShape} ${styles.shape4}`} />
      <div className={styles.frame4}>
        <ArtworkFrame orientation="portrait" />
        <ProjectButtons />
      </div>

      <div className={styles.footerTitle}>
        <span aria-hidden="true">&#123;</span>
        <p>
          Art Work
          <br />
          &amp;
          <br />
          Animation
        </p>
        <span aria-hidden="true">&#125;</span>
      </div>
    </section>
  );
}
