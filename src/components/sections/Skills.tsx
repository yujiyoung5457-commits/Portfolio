"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./Skills.module.scss";

const skills = [
  {
    name: "React",
    image: "/pt_img/reactcolor.webp",
  },
  {
    name: "TypeScript",
    image: "/pt_img/ts.webp",
  },
  {
    name: "HTML5",
    image: "/pt_img/htmll.webp",
  },
  {
    name: "CSS3",
    image: "/pt_img/csscolor.webp",
  },
  {
    name: "JavaScript",
    image: "/pt_img/colorjs.webp",
  },
];

export function Skills() {
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
  return (
    <section className={styles.section} id="skills" aria-labelledby="skills-title">
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

      <div className={styles.skillList}>
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
