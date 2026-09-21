"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./CreativeStatement.module.scss";

export function CreativeStatement() {
  const powerCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = powerCanvasRef.current;

    if (!canvas) return;

    const drawPower = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = window.devicePixelRatio || 1;
      const width = bounds.width;
      const height = bounds.height;

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);

      const context = canvas.getContext("2d");

      if (!context) return;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);
      context.fillStyle =
        getComputedStyle(canvas).getPropertyValue("--color-blue").trim() || "#060a7b";

      const motifWidth = width / 2;

      for (let index = 0; index < 2; index += 1) {
        const x = motifWidth * index;

        context.beginPath();
        context.moveTo(x, height * 0.43);
        context.bezierCurveTo(
          x + motifWidth * 0.08,
          height * 0.19,
          x + motifWidth * 0.18,
          height * 0.7,
          x + motifWidth * 0.3,
          height * 0.45,
        );
        context.bezierCurveTo(
          x + motifWidth * 0.42,
          height * 0.19,
          x + motifWidth * 0.5,
          height * 0.7,
          x + motifWidth * 0.62,
          height * 0.42,
        );
        context.bezierCurveTo(
          x + motifWidth * 0.76,
          height * 0.09,
          x + motifWidth * 0.87,
          height * 0.69,
          x + motifWidth,
          height * 0.43,
        );
        context.lineTo(x + motifWidth, height);
        context.lineTo(x, height);
        context.closePath();
        context.fill();
      }
    };

    const resizeObserver = new ResizeObserver(drawPower);
    resizeObserver.observe(canvas);
    drawPower();

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <section className={styles.section} aria-labelledby="creative-statement-title">
      <Image
        className={styles.background}
        src="/section01_background03.png"
        alt=""
        fill
        sizes="100vw"
      />

      <canvas
        ref={powerCanvasRef}
        className={styles.power}
        aria-hidden="true"
      />

      <Image
        className={styles.leftArtwork}
        src="/pt_img/el01.svg"
        alt=""
        width={138}
        height={138}
      />

      <Image
        className={styles.rightArtwork}
        src="/pt_img/el02.svg"
        alt=""
        width={142}
        height={148}
      />

      <div className={styles.mainTitle}>
        <Image
          className={styles.titleShadow}
          src="/pt_img/maintitle01.svg"
          alt=""
          width={319}
          height={318}
        />
        <Image
          className={styles.titleSurface}
          src="/pt_img/maintitle02.svg"
          alt=""
          width={319}
          height={318}
        />

        <h2 className={styles.title} id="creative-statement-title">
          <span className={styles.anton}>Make it</span>
          <span className={styles.script}>Visible</span>
          <span className={styles.anton}>Make it</span>
          <span className={styles.script}>Work.</span>
        </h2>
      </div>
    </section>
  );
}
