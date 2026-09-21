import { Scene } from "@/components/three/Scene";
import styles from "./DesignCode.module.scss";

export function DesignCode() {
  return (
    <section className={styles.section} aria-labelledby="design-code-title">
      <h2 className={styles.title} id="design-code-title">
        <span className={styles.where}>Where</span>
        <span className={styles.design}>Design</span>
        <span className={styles.meets}>Meets</span>
        <span className={styles.code}>Code</span>
      </h2>

      <div className={styles.flower}>
        <div className={styles.modelStage}>
          <Scene />
        </div>
      </div>
    </section>
  );
}
