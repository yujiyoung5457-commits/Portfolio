import styles from "./ArtSlider.module.scss";

export function ArtSlider() {
  return (
    <section className={styles.section} aria-labelledby="art-slider-title">
      <div className={styles.stickyStage}>
        <div className={styles.heading}>
          <span aria-hidden="true">&#123;</span>
          <h2 id="art-slider-title">
            Art Work
            <br />
            &amp;
            <br />
            Animation
          </h2>
          <span aria-hidden="true">&#125;</span>
        </div>

        <div className={styles.track} aria-label="작품 슬라이드 이미지 영역">
          <div className={styles.placeholder} role="img" aria-label="첫 번째 작품 이미지" />
          <div
            className={`${styles.placeholder} ${styles.activePlaceholder}`}
            role="img"
            aria-label="두 번째 작품 이미지"
          />
          <div className={styles.placeholder} role="img" aria-label="세 번째 작품 이미지" />
        </div>
      </div>
    </section>
  );
}
