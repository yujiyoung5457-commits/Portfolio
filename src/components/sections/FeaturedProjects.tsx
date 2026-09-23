"use client";

import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./FeaturedProjects.module.scss";

export function FeaturedProjects() {
  const goButtonRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline>(null);
  const isMovingRef = useRef(false);

  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  const handleGoClick = () => {
    const button = goButtonRef.current;
    const lastProject = document.getElementById("another-project");
    const teamProject = document.getElementById("team-projects");

    if (!button || !lastProject || !teamProject || isMovingRef.current) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const headerHeight = Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--header-height"),
    ) || 0;
    const lastProjectY =
      window.scrollY + lastProject.getBoundingClientRect().top - headerHeight;
    const teamProjectY =
      window.scrollY + teamProject.getBoundingClientRect().top - headerHeight;

    button.classList.remove(styles.goLaunched);

    if (reduceMotion) {
      button.classList.add(styles.goLaunched);
      window.scrollTo(0, teamProjectY);
      return;
    }

    isMovingRef.current = true;
    const scrollPosition = { y: window.scrollY };

    timelineRef.current = gsap
      .timeline({
        onComplete: () => {
          isMovingRef.current = false;
          gsap.set(button, { clearProps: "transform" });
        },
      })
      .to(button, { scale: 1.6, duration: 0.38, ease: "back.out(1.8)" })
      .add(() => button.classList.add(styles.goLaunched))
      .to(button, { scale: 1, duration: 0.28, ease: "power3.inOut" })
      .to(
        scrollPosition,
        {
          y: lastProjectY,
          duration: 2,
          ease: "power4.inOut",
          onUpdate: () => window.scrollTo(0, scrollPosition.y),
        },
        ">-0.05",
      )
      .to(scrollPosition, {
        y: teamProjectY,
        duration: 3.5,
        ease: "power4.inOut",
        onUpdate: () => window.scrollTo(0, scrollPosition.y),
        onComplete: () => window.dispatchEvent(new Event("team-project-reveal")),
      });
  };

  return (
    <section
      className={styles.section}
      id="projects"
      aria-labelledby="projects-title"
    >
      <Image
        className={styles.leftArtwork}
        src="/pt_img/el03.svg"
        alt=""
        width={113}
        height={169}
      />

      <div className={styles.center}>
        <h2 className={styles.title} id="projects-title">
          <span>Selected</span>
          <span>Projects</span>
        </h2>
        <button
          ref={goButtonRef}
          className={styles.go}
          type="button"
          aria-controls="another-project team-projects"
          onClick={handleGoClick}
        >
          <Image
            className={styles.goShape}
            src="/go_go.svg"
            alt=""
            fill
            sizes="20rem"
          />
          <span>Go</span>
        </button>
      </div>

      <span className={styles.dot} aria-hidden="true" />

      <Image
        className={styles.rightArtwork}
        src="/pt_img/el03.svg"
        alt=""
        width={113}
        height={169}
      />
    </section>
  );
}
