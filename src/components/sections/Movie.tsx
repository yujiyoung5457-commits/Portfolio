import Image from "next/image";
import styles from "./Movie.module.scss";

export function Movie() {
  return (
    <section className={styles.section} id="contact" aria-label="Movie and contact">
      <div className={styles.intro}>
        <svg
          className={styles.squiggle}
          viewBox="0 0 1440 170"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M-30 95 C55 8 118 8 104 88 S218 154 258 82 S350 30 340 101 S438 132 493 87 S596 55 611 119 S710 151 742 77 S842 8 854 73 S953 129 1003 70 S1110 14 1123 82 S1222 141 1272 72 S1380 22 1470 89" />
        </svg>

        <Image
          className={styles.logo}
          src="/pt_img/simusimu-hae.png"
          alt="Simu Simu Hae"
          width={1466}
          height={760}
        />
        <Image
          className={styles.heroCats}
          src="/pt_img/simusimu-hae-neko.png"
          alt=""
          width={450}
          height={536}
        />
      </div>

      <div className={styles.movieFrame} aria-label="Movie preview">
        <video
          className={styles.movie}
          src="/simusimu-hae.mp4"
          aria-label="Movie preview"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>

      <div className={styles.contactDisc}>
        <div className={styles.contactText}>
          <a href="mailto:yujiy0303@naver.com">e-mail: yujiy0303@naver.com</a>
          <a href="tel:01054572905">Phone-number: 010-5457-2905</a>
        </div>
      </div>
    </section>
  );
}
