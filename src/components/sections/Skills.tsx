"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./Skills.module.scss";

/*
 * 각 물감 줄기의 개별 조절값입니다.
 * color: 물감 색상
 * length: 물감 길이(px). 화면보다 길면 자동으로 화면 안에 맞춰집니다.
 * thickness: 물감 굵기(px)
 * wave: 위아래로 휘는 정도(px). 0이면 거의 직선입니다.
 */
const skills = [
  {
    name: "React",
    image: "/pt_img/reactcolor.webp",
    paint: { color: "#22efc4", length: 680, thickness: 38, wave: 24 },
  },
  {
    name: "TypeScript",
    image: "/pt_img/ts.webp",
    paint: { color: "#22efc4", length: 620, thickness: 36, wave: 20 },
  },
  {
    name: "HTML5",
    image: "/pt_img/htmll.webp",
    paint: { color: "#22efc4", length: 700, thickness: 40, wave: 26 },
  },
  {
    name: "CSS3",
    image: "/pt_img/csscolor.webp",
    paint: { color: "#22efc4", length: 650, thickness: 36, wave: 22 },
  },
  {
    name: "JavaScript",
    image: "/pt_img/colorjs.webp",
    paint: { color: "#22efc4", length: 720, thickness: 40, wave: 28 },
  },
];

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const paintCanvasRef = useRef<HTMLCanvasElement>(null);
  const skillListRef = useRef<HTMLDivElement>(null);
  const titleGraphicRef = useRef<HTMLDivElement>(null);
  const [isPainted, setIsPainted] = useState(false);

  useEffect(() => {
    const titleGraphic = titleGraphicRef.current;
    if (!titleGraphic) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setIsPainted(true);
      observer.disconnect();
    }, { threshold: 0.35 });

    observer.observe(titleGraphic);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = paintCanvasRef.current;
    const skillList = skillListRef.current;

    if (!section || !canvas || !skillList) return;

    const rows = Array.from(
      skillList.querySelectorAll<HTMLElement>(`.${styles.skillRow}`),
    );

    const drawPaint = () => {
      const sectionBounds = section.getBoundingClientRect();
      const width = sectionBounds.width;
      const height = sectionBounds.height;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);

      const context = canvas.getContext("2d");

      if (!context) return;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);
      context.lineCap = "round";
      context.lineJoin = "round";

      rows.forEach((row, index) => {
        const rowBounds = row.getBoundingClientRect();
        const paint = skills[index].paint;
        const startX = rowBounds.right - sectionBounds.left - 10;
        const startY = rowBounds.top - sectionBounds.top + rowBounds.height / 2;
        const availableLength = Math.max(0, width - startX - 32);
        const responsiveScale = Math.min(1, width / 1200);
        const length = Math.min(paint.length * responsiveScale, availableLength);
        const endX = startX + length;
        const wave = paint.wave * responsiveScale;

        context.beginPath();
        context.moveTo(startX - paint.thickness * 0.25, startY);
        context.bezierCurveTo(
          startX + length * 0.2,
          startY - wave,
          startX + length * 0.42,
          startY + wave,
          startX + length * 0.62,
          startY + wave * 0.25,
        );
        context.bezierCurveTo(
          startX + length * 0.78,
          startY - wave * 0.55,
          startX + length * 0.9,
          startY - wave * 0.75,
          endX,
          startY,
        );
        context.strokeStyle = paint.color;
        context.lineWidth = paint.thickness * responsiveScale;
        context.stroke();
      });
    };

    const resizeObserver = new ResizeObserver(drawPaint);
    resizeObserver.observe(section);
    resizeObserver.observe(skillList);
    rows.forEach((row) => resizeObserver.observe(row));
    drawPaint();

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="skills"
      aria-labelledby="skills-title"
    >
      <canvas ref={paintCanvasRef} className={styles.paintCanvas} aria-hidden="true" />

      <div
        ref={titleGraphicRef}
        className={`${styles.titleGraphic} ${isPainted ? styles.isPainted : ""}`}
      >
        <Image
          className={styles.titleBackground}
          src="/pt_img/skills.svg"
          alt=""
          fill
          sizes="(max-width: 700px) 92vw, 55vw"
        />
        <h2 id="skills-title">Skills</h2>
      </div>

      <Image
        className={styles.decoration}
        src="/pt_img/el06.svg"
        alt=""
        width={227}
        height={120}
      />

      <div ref={skillListRef} className={styles.skillList}>
        {skills.map((skill) => (
          <div className={styles.skillRow} key={skill.name}>
            <Image
              className={styles.skillImage}
              src={skill.image}
              alt={skill.name}
              fill
              sizes="(max-width: 520px) 30vw, 18vw"
            />
          </div>
        ))}
      </div>

      <Image
        className={styles.palette}
        src="/palet.webp"
        alt=""
        width={1555}
        height={1012}
      />
    </section>
  );
}
