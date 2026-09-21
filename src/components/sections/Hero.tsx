"use client";

import { Scene } from "@/components/three/Scene";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import styles from "./Hero.module.scss";

const introBackgrounds = [
  "/section01_background_01.png",
  "/section01_background_02.png",
  "/section01_background_03.png",
  "/section01_background_04.png",
  "/section01_background_05.png",
  "/section01_background_06.png",
];

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const introPanelRef = useRef<HTMLDivElement>(null);
  const backgroundRefs = useRef<(HTMLImageElement | null)[]>([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const frames = backgroundRefs.current.filter(
        (frame): frame is HTMLImageElement => frame !== null,
      );

      gsap.set(frames, { autoAlpha: 0 });
      gsap.set(frames[0], { autoAlpha: 1 });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: introPanelRef.current,
          start: "top top",
          end: "+=500%",
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
        },
      });

      for (let index = 1; index < frames.length; index += 1) {
        const changeAt = index;

        timeline
          .to(frames[index - 1], { autoAlpha: 0, duration: 0.22 }, changeAt)
          .to(frames[index], { autoAlpha: 1, duration: 0.22 }, changeAt);
      }
    }, heroRef);

    return () => context.revert();
  }, []);

  return (
    <section ref={heroRef} className={styles.hero} id="home" aria-labelledby="hero-title">
      <div ref={introPanelRef} className={`${styles.panel} ${styles.introPanel}`}>
        <div className={styles.backgroundSequence} aria-hidden="true">
          {introBackgrounds.map((src, index) => (
            <Image
              ref={(node) => {
                backgroundRefs.current[index] = node;
              }}
              className={styles.background}
              src={src}
              alt=""
              fill
              priority={index === 0}
              loading={index === 0 ? undefined : "eager"}
              quality={100}
              sizes="100vw"
              key={src}
            />
          ))}
        </div>

        <h1 className={`${styles.title} ${styles.developer}`} id="hero-title">
          Frontend Developer
        </h1>

        <div className={styles.modelStage}>
          <Scene />
        </div>

        <p className={`${styles.title} ${styles.designer}`}>
          <span className={styles.ampersand}>&amp;</span>
          <span>Web Designer</span>
        </p>
      </div>

      <div className={`${styles.panel} ${styles.canvasPanel}`}>
        <Image
          className={styles.background02}
          src="/section01_background02.png"
          alt="사이로 바다가 보이는 파란색과 노란색 곡선 천장의 실내 공간"
          fill
          quality={100}
          sizes="100vw"
        />

        <p className={styles.canvasHeading}>From Canvas To</p>

        <div className={styles.artwork} aria-hidden="true">
          <Image
            className={styles.artworkGlow}
            src="/pt_img/el04_bright.svg"
            alt=""
            width={216}
            height={326}
          />
          <Image
            className={styles.artworkMain}
            src="/pt_img/el04.svg"
            alt=""
            width={123}
            height={233}
          />
        </div>

        <p className={styles.code}>Code.</p>
      </div>
    </section>
  );
}
