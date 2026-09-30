"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./MiniProjects.module.scss";

export function MiniProjects() {
  const flowCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = flowCanvasRef.current;

    if (!canvas) return;

    const drawFlow = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const pixelRatio = window.devicePixelRatio || 1;

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);

      const context = canvas.getContext("2d");

      if (!context) return;

      const shapeWidth = width * (width <= 760 ? 0.76 : 0.6);
      const x = (ratio: number) => shapeWidth * ratio;
      const y = (ratio: number) => height * ratio;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#ffaa00";

      const flowPoints = [
        [1, 0.25],
        [0.94, 0.5],
        [0.88, 0.43],
        [0.81, 0.68],
        [0.72, 0.52],
        [0.61, 0.76],
        [0.49, 0.57],
        [0.37, 0.74],
        [0.25, 0.55],
        [0.12, 0.69],
        [0, 0.59],
      ] as const;

      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(shapeWidth, 0);
      context.lineTo(x(flowPoints[0][0]), y(flowPoints[0][1]));

      for (let index = 1; index < flowPoints.length - 1; index += 1) {
        const [currentX, currentY] = flowPoints[index];
        const [nextX, nextY] = flowPoints[index + 1];
        context.quadraticCurveTo(
          x(currentX),
          y(currentY),
          x((currentX + nextX) / 2),
          y((currentY + nextY) / 2),
        );
      }

      const [lastX, lastY] = flowPoints.at(-1)!;
      context.quadraticCurveTo(x(lastX), y(lastY), 0, y(lastY));
      context.closePath();
      context.fill();
    };

    const resizeObserver = new ResizeObserver(drawFlow);
    resizeObserver.observe(canvas);
    drawFlow();

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <section
      className={styles.section}
      id="mini-projects"
      aria-labelledby="mini-projects-title"
    >
      <canvas ref={flowCanvasRef} className={styles.flowCanvas} aria-hidden="true" />

      <div className={styles.layout}>
        <h2 id="mini-projects-title">Mini Project</h2>

        <div className={styles.projectMenus}>
          <div className={styles.menuGroup}>
            <h3>mini projects</h3>
            <button type="button">Gray-wall</button>
            <button type="button">fruit animation</button>
            <button type="button">CALCULATOR</button>
          </div>

          <div className={`${styles.menuGroup} ${styles.copyMenu}`}>
            <h3>copy-site</h3>
            <button type="button">Woodin</button>
            <button type="button">GenstarMate</button>
            <button type="button">FMK</button>
          </div>
        </div>

        <article className={styles.televisionProject}>
          <div className={styles.television}>
            <div className={styles.televisionScreen}>
              <p>
                프로젝트의 이미지가
                <br />
                들어갈 부분
              </p>
            </div>
            <Image
              className={styles.televisionFrame}
              src="/terevision.png"
              alt=""
              fill
              sizes="(max-width: 760px) 92vw, 50vw"
            />
          </div>
        </article>

        <article className={styles.projectWindow} aria-label="미니 프로젝트 설명 영역">
          <div className={styles.windowBar} aria-hidden="true">
            <span className={styles.redDot} />
            <span className={styles.greenDot} />
            <span className={styles.blueDot} />
            <span className={styles.close}>×</span>
          </div>
          <div className={styles.windowBody} />
        </article>
      </div>
    </section>
  );
}
