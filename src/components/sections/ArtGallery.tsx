"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./ArtGallery.module.scss";

function ProjectButtons({ className }: { className: string }) {
  return (
    <div className={`${styles.buttons} ${className}`}>
      <span>Live Site</span>
      <span>Git Hub</span>
    </div>
  );
}

export function ArtGallery() {
  const lineCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = lineCanvasRef.current;

    if (!canvas) return;

    const drawLine = () => {
      const bounds = canvas.getBoundingClientRect();
      const width = bounds.width;
      const height = bounds.height;

      canvas.width = Math.round(width);
      canvas.height = Math.round(height);

      const context = canvas.getContext("2d");

      if (!context) return;

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, width, height);
      context.fillStyle =
        getComputedStyle(canvas).getPropertyValue("--color-blue").trim() || "#060a7b";

      const sourceWidth = 3012.21;
      const sourceHeight = 11201.24;
      const lineLeft = width * 0.586;
      const scaleX = (width * 0.414) / sourceWidth;
      const scaleY = height / sourceHeight;
      const x = (value: number) => lineLeft + value * scaleX;
      const y = (value: number) => value * scaleY;

      context.beginPath();
      context.moveTo(x(820.61), y(0));
      context.bezierCurveTo(
        x(820.61),
        y(0),
        x(634.93),
        y(1405.9),
        x(720.47),
        y(2305.79),
      );
      context.bezierCurveTo(
        x(806.01),
        y(3205.68),
        x(1171),
        y(4374.54),
        x(920.07),
        y(5597.95),
      );
      context.bezierCurveTo(
        x(669.14),
        y(6821.36),
        x(235.72),
        y(7642.59),
        x(30.41),
        y(9832.53),
      );
      context.bezierCurveTo(
        x(30.41),
        y(9832.53),
        x(-38.03),
        y(10448.45),
        x(30.41),
        y(11201.24),
      );
      context.lineTo(width, height);
      context.lineTo(width, 0);
      context.closePath();
      context.fill();
    };

    const resizeObserver = new ResizeObserver(drawLine);
    resizeObserver.observe(canvas);
    drawLine();

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <section className={styles.section} aria-labelledby="art-gallery-title">
      {/* <div className={styles.orangePanel} aria-hidden="true" /> */}

      {/* 클리핑 마스크 형태 1: 텍스트가 들어갈 아이보리색 영역 */}
      <div className={`${styles.textureShape} ${styles.shape1}`} />

      {/* 액자 + 액자 안쪽 검정 박스 1 */}
      <div className={styles.frame1}>
        <div className={`${styles.frame} ${styles.frame1Frame}`}>
          <div className={styles.frameWindow} aria-label="작품 이미지 영역 1" />
          <Image src="/pt_img/frame02.png" alt="" fill sizes="28vw" />
        </div>
        <ProjectButtons className={styles.frame1Buttons} />
      </div>

      {/* 액자 + 액자 안쪽 검정 박스 2 */}
      <div className={styles.frame2}>
        <div className={`${styles.frame} ${styles.frame2Frame}`}>
          <div className={styles.frameWindow} aria-label="작품 이미지 영역 2" />
          <Image src="/pt_img/frame01.png" alt="" fill sizes="65rem" />
        </div>
        <ProjectButtons className={styles.frame2Buttons} />
      </div>

      {/* 클리핑 마스크 형태 2: 텍스트가 들어갈 아이보리색 영역 */}
      <div className={`${styles.textureShape} ${styles.shape2}`} />

      {/* 액자 + 액자 안쪽 검정 박스 3 */}
      <div className={styles.frame3}>
        <div className={`${styles.frame} ${styles.frame3Frame}`}>
          <div className={styles.frameWindow} aria-label="작품 이미지 영역 3" />
          <Image src="/pt_img/frame02.png" alt="" fill sizes="28vw" />
        </div>
        <ProjectButtons className={styles.frame3Buttons} />
      </div>

      {/* 클리핑 마스크 형태 3: 텍스트가 들어갈 아이보리색 영역 */}
      <div className={`${styles.textureShape} ${styles.shape3}`} />

      {/* 클리핑 마스크 형태 4: 텍스트가 들어갈 아이보리색 영역 */}
      <div className={`${styles.textureShape} ${styles.shape4}`} />

      {/* 액자 + 액자 안쪽 검정 박스 4 */}
      <div className={styles.frame4}>
        <div className={`${styles.frame} ${styles.frame4Frame}`}>
          <div className={styles.frameWindow} aria-label="작품 이미지 영역 4" />
          <Image src="/pt_img/frame02.png" alt="" fill sizes="28vw" />
        </div>
        <ProjectButtons className={styles.frame4Buttons} />
      </div>

      <canvas ref={lineCanvasRef} className={styles.line} aria-hidden="true" />
    </section>
  );
}
