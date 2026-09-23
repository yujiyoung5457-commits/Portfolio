"use client";

import { Scene } from "@/components/three/Scene";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { createHeroVortex } from "./heroVortex";
import styles from "./Hero.module.scss";

const introBackgrounds = [
  "/heromain_1.webp",
  "/heromain_2.webp",
  "/heromain_3.webp",
  "/heromain_4.webp",
  "/heromain_5.webp",
  "/heromain_6.webp",
];

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const introPanelRef = useRef<HTMLDivElement>(null);
  const backgroundRefs = useRef<(HTMLImageElement | null)[]>([]);
  const vortexCanvasRef = useRef<HTMLCanvasElement>(null);
  const vortexRenderRef = useRef<(progress: number) => void>(() => undefined);
  const vortexSupportedRef = useRef(false);

  useLayoutEffect(() => {
    const canvas = vortexCanvasRef.current;

    if (!canvas) return;

    const vortex = createHeroVortex(canvas, "/heromain_6.webp");
    vortexSupportedRef.current = vortex !== null;

    if (vortex) vortexRenderRef.current = vortex.render;

    return () => {
      vortex?.dispose();
      vortexRenderRef.current = () => undefined;
      vortexSupportedRef.current = false;
    };
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const frames = backgroundRefs.current.filter(
        (frame): frame is HTMLImageElement => frame !== null,
      );
      const vortexCanvas = vortexCanvasRef.current;

      gsap.set(frames, { autoAlpha: 0 });
      gsap.set(frames[0], { autoAlpha: 1 });
      gsap.set(vortexCanvas, { autoAlpha: 0 });

      let activeFrame = 0;

      const showFrame = (index: number) => {
        if (index === activeFrame) return;

        gsap.set(frames, { autoAlpha: 0 });
        gsap.set(frames[index], { autoAlpha: 1 });
        activeFrame = index;
      };

      ScrollTrigger.create({
        trigger: introPanelRef.current,
        start: "top top",
        end: "+=600%",
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const index = Math.min(
            frames.length - 1,
            Math.floor(self.progress * (frames.length + 1)),
          );
          const vortexProgress = gsap.utils.clamp(
            0,
            1,
            (self.progress - frames.length / (frames.length + 1)) *
              (frames.length + 1),
          );

          showFrame(index);
          vortexRenderRef.current(vortexProgress);

          if (vortexSupportedRef.current) {
            gsap.set(vortexCanvas, { autoAlpha: vortexProgress > 0 ? 1 : 0 });
          } else {
            gsap.set(frames.at(-1) ?? null, {
              scale: 1 - vortexProgress * 0.92,
              rotation: vortexProgress * 540,
              autoAlpha: 1 - vortexProgress,
            });
          }
        },
      });
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
              unoptimized
              key={src}
            />
          ))}
        </div>

        <canvas
          ref={vortexCanvasRef}
          className={styles.vortexCanvas}
          aria-hidden="true"
        />

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
          src="/section01_background02.webp"
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
