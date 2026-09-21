import Image from "next/image";
import styles from "./Skills.module.scss";

const skills = [
  {
    name: "React",
    image: "/pt_img/reactcolor.png",
  },
  {
    name: "TypeScript",
    image: "/pt_img/ts.png",
  },
  {
    name: "HTML5",
    image: "/pt_img/htmll.png",
  },
  {
    name: "CSS3",
    image: "/pt_img/csscolor.png",
  },
  {
    name: "JavaScript",
    image: "/pt_img/colorjs.png",
  },
];

export function Skills() {
  return (
    <section className={styles.section} id="skills" aria-labelledby="skills-title">
      <div className={styles.titleGraphic}>
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
              width={1536}
              height={1024}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
