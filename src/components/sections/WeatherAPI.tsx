"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import taro from "@/data/taro.json";
import styles from "./WeatherAPI.module.scss";

type Weather = {
  city: string;
  country: string;
  temperature: number;
  windSpeed: number;
  humidity: number;
  condition: string;
  precipitation: number;
};

type WeatherResponse = {
  weather?: Weather[];
  message?: string;
};

const WINDOW_IMAGES = [
  "/window02.svg",
  "/window01.svg",
  "/window01.svg",
  "/window02.svg",
];

function randomTaro() {
  return taro[Math.floor(Math.random() * taro.length)];
}

export function WeatherAPI() {
  const [weather, setWeather] = useState<Weather[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [fortune, setFortune] = useState(taro[0]);
  const [error, setError] = useState("");
  const [flippedCards, setFlippedCards] = useState<[boolean, boolean]>([
    false,
    false,
  ]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadWeather() {
      try {
        const response = await fetch("/api/weather", { signal: controller.signal });
        const data = (await response.json()) as WeatherResponse;

        if (!response.ok || !data.weather) {
          throw new Error(data.message ?? "Could not load weather data.");
        }

        setWeather(data.weather);
        setSelectedIndex(Math.floor(Math.random() * data.weather.length));
        setFortune(randomTaro());
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === "AbortError") return;

        setError(
          requestError instanceof Error
            ? requestError.message
            : "Could not load weather data.",
        );
      }
    }

    loadWeather();
    return () => controller.abort();
  }, []);

  const selectedWeather = weather[selectedIndex];
  const toggleCard = (cardIndex: 0 | 1) => {
    setFlippedCards((current) =>
      current.map((isFlipped, index) =>
        index === cardIndex ? !isFlipped : isFlipped,
      ) as [boolean, boolean],
    );
  };

  return (
    <section className={styles.section} aria-labelledby="weather-api-title">
      <div className={styles.composition}>
        <button
          className={`${styles.card} ${styles.cardLeft} ${
            flippedCards[0] ? styles.cardFlipped : ""
          }`}
          type="button"
          aria-label="Flip the left tarot card"
          aria-pressed={flippedCards[0]}
          onClick={() => toggleCard(0)}
        >
          <span className={styles.cardInner}>
            <Image
              className={`${styles.cardFace} ${styles.cardFront}`}
              src="/card.svg"
              alt=""
              fill
              sizes="18vw"
            />
            <Image
              className={`${styles.cardFace} ${styles.cardBack}`}
              src="/card-back.svg"
              alt=""
              fill
              sizes="18vw"
            />
          </span>
        </button>
        <button
          className={`${styles.card} ${styles.cardRight} ${
            flippedCards[1] ? styles.cardFlipped : ""
          }`}
          type="button"
          aria-label="Flip the right tarot card"
          aria-pressed={flippedCards[1]}
          onClick={() => toggleCard(1)}
        >
          <span className={styles.cardInner}>
            <Image
              className={`${styles.cardFace} ${styles.cardFront}`}
              src="/card.svg"
              alt=""
              fill
              sizes="18vw"
            />
            <Image
              className={`${styles.cardFace} ${styles.cardBack}`}
              src="/card-back.svg"
              alt=""
              fill
              sizes="18vw"
            />
          </span>
        </button>

        <div className={styles.ribbon}>
        <Image
          src="/riborn.svg"
          alt="Daily Weather & Taro"
          fill
          sizes="48vw"
        />
        <h2 id="weather-api-title" className={styles.visuallyHidden}>
          Daily Weather &amp; Taro
        </h2>
        </div>

        <div className={styles.windows} aria-hidden="true">
        {WINDOW_IMAGES.map((src, index) => (
          <div className={styles.window} key={`${src}-${index}`}>
            <Image
              className={styles.windowFrame}
              src={src}
              alt=""
              fill
              sizes="11vw"
            />
          </div>
        ))}
        </div>

        <div className={styles.result} aria-live="polite">
        <Image className={styles.resultShape} src="/setumei.svg" alt="" fill sizes="84vw" />

        <div className={styles.resultContent}>
          {error ? (
            <p className={styles.status}>{error}</p>
          ) : selectedWeather ? (
            <>
              <div className={styles.weatherHeading}>
                <p>{selectedWeather.country}</p>
                <h3>{selectedWeather.city}</h3>
              </div>

              <dl className={styles.weatherDetails}>
                <div>
                  <dt>Temperature</dt>
                  <dd>{selectedWeather.temperature.toFixed(1)}°C</dd>
                </div>
                <div>
                  <dt>Wind</dt>
                  <dd>{selectedWeather.windSpeed.toFixed(1)} m/s</dd>
                </div>
                <div>
                  <dt>Humidity</dt>
                  <dd>{selectedWeather.humidity}%</dd>
                </div>
                <div>
                  <dt>Weather</dt>
                  <dd>{selectedWeather.condition}</dd>
                </div>
                <div>
                  <dt>Rain / Snow</dt>
                  <dd>{selectedWeather.precipitation.toFixed(1)} mm</dd>
                </div>
              </dl>

              <p className={styles.fortune}>
                <strong>Today&apos;s Taro</strong>
                <span>{fortune}</span>
              </p>
            </>
          ) : (
            <p className={styles.status}>Loading today&apos;s weather and fortune...</p>
          )}
        </div>
        </div>
      </div>
    </section>
  );
}
