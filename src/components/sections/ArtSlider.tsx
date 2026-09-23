"use client";

import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { useEffect, useRef } from "react";
import styles from "./ArtSlider.module.scss";

const CARD_COUNT = 3;

export function ArtSlider() {
  const powerTopRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLUListElement>(null);
  const dragProxyRef = useRef<HTMLDivElement>(null);
  const previousButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const canvas = powerTopRef.current;

    if (!canvas) return;

    const drawPowerTop = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const pixelRatio = window.devicePixelRatio || 1;

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);

      const context = canvas.getContext("2d");

      if (!context) return;

      const x = (ratio: number) => width * ratio;
      const y = (ratio: number) => height * ratio;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);
      context.fillStyle =
        getComputedStyle(canvas).getPropertyValue("--color-blue").trim() || "#060a7b";

      context.beginPath();
      context.moveTo(0, y(0.72));
      context.bezierCurveTo(x(0.045), y(0.57), x(0.09), y(0.86), x(0.15), y(0.77));
      context.bezierCurveTo(x(0.17), y(0.56), x(0.22), y(0.43), x(0.28), y(0.56));
      context.bezierCurveTo(x(0.34), y(0.71), x(0.37), y(0.58), x(0.41), y(0.38));
      context.bezierCurveTo(x(0.45), y(0.2), x(0.47), y(0.58), x(0.51), y(0.42));
      context.bezierCurveTo(x(0.55), y(0.25), x(0.575), y(0.16), x(0.59), 0);
      context.lineTo(width, 0);
      context.lineTo(width, height);
      context.lineTo(0, height);
      context.closePath();
      context.fill();
    };

    const resizeObserver = new ResizeObserver(drawPowerTop);
    resizeObserver.observe(canvas);
    drawPowerTop();

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const cardsList = cardsRef.current;
    const dragProxy = dragProxyRef.current;
    const previousButton = previousButtonRef.current;
    const nextButton = nextButtonRef.current;

    if (!stage || !cardsList || !dragProxy || !previousButton || !nextButton) return;

    gsap.registerPlugin(Draggable);

    const cards = Array.from(cardsList.children) as HTMLElement[];
    let activeIndex = 0;
    let cleanupInteractions = () => {};

    const context = gsap.context(() => {
      const renderCards = (animate: boolean) => {
        cards.forEach((card, index) => {
          const relativeIndex = (index - activeIndex + cards.length) % cards.length;
          const position =
            relativeIndex === 0
              ? { xPercent: 0, scale: 1, zIndex: 3 }
              : relativeIndex === 1
                ? { xPercent: 82, scale: 0.9, zIndex: 2 }
                : { xPercent: -82, scale: 0.9, zIndex: 2 };

          const properties = {
            ...position,
            x: 0,
            autoAlpha: 1,
            duration: animate ? 0.55 : 0,
            ease: "power3.out",
            overwrite: true,
          };

          if (animate) {
            gsap.to(card, properties);
          } else {
            gsap.set(card, properties);
          }
        });
      };

      const showCard = (direction: number) => {
        activeIndex = gsap.utils.wrap(0, cards.length, activeIndex + direction);
        renderCards(true);
      };

      const showNext = () => showCard(1);
      const showPrevious = () => showCard(-1);

      renderCards(false);
      nextButton.addEventListener("click", showNext);
      previousButton.addEventListener("click", showPrevious);

      const [draggable] = Draggable.create(dragProxy, {
        type: "x",
        trigger: cardsList,
        allowNativeTouchScrolling: true,
        onDrag() {
          const dragDistance = this.x - this.startX;
          gsap.set(cards, { x: dragDistance });
        },
        onDragEnd() {
          const dragDistance = this.x - this.startX;
          gsap.set(dragProxy, { x: 0 });

          if (Math.abs(dragDistance) >= 60) {
            showCard(dragDistance < 0 ? 1 : -1);
          } else {
            renderCards(true);
          }
        },
      });

      cleanupInteractions = () => {
        nextButton.removeEventListener("click", showNext);
        previousButton.removeEventListener("click", showPrevious);
        draggable.kill();
      };
    }, stage);

    return () => {
      cleanupInteractions();
      context.revert();
    };
  }, []);

  return (
    <section className={styles.section} aria-labelledby="art-slider-title">
      <canvas
        ref={powerTopRef}
        className={styles.powerTop}
        width={7078}
        height={1925}
        aria-hidden="true"
      />

      <div ref={stageRef} className={styles.stickyStage}>
        <div className={styles.heading}>
          <span aria-hidden="true">&#123;</span>
          <h2 id="art-slider-title">
            Art Work
            <br />
            &amp;
            <br />
            Animation
          </h2>
          <span aria-hidden="true">&#125;</span>
        </div>

        <div className={styles.gallery}>
          <ul ref={cardsRef} className={styles.cards} aria-label="작품 슬라이드">
            {Array.from({ length: CARD_COUNT }, (_, index) => (
              <li key={index} className={styles.card} aria-label={`작품 ${index + 1}`} />
            ))}
          </ul>

          <div className={styles.actions}>
            <button ref={previousButtonRef} type="button">
              Prev
            </button>
            <button ref={nextButtonRef} type="button">
              Next
            </button>
          </div>

          <div ref={dragProxyRef} className={styles.dragProxy} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
