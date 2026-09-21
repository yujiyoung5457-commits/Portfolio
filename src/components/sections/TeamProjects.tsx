import styles from "./TeamProjects.module.scss";

const projects = ["Project one", "Project two", "Project three"];

export function TeamProjects() {
  return (
    <section className={styles.section} aria-labelledby="team-project-title">
      <div className={styles.stage}>
        <h2 className={styles.title} id="team-project-title">
          <span>Team</span>
          <span>Project</span>
        </h2>

        {projects.map((project, index) => (
          <article
            className={`${styles.project} ${styles[`project${index + 1}`]}`}
            key={project}
          >
            <div className={styles.placeholder} aria-label={`${project} 이미지 영역`} />
            <div className={styles.actions}>
              <button className={styles.liveButton} type="button">
                Live Site
              </button>
              <button className={styles.githubButton} type="button">
                Github
              </button>
            </div>
          </article>
        ))}

        <span className={`${styles.dot} ${styles.dotLarge}`} aria-hidden="true" />
        <span className={`${styles.dot} ${styles.dotMedium}`} aria-hidden="true" />
        <span className={`${styles.dot} ${styles.dotSmall}`} aria-hidden="true" />
      </div>
    </section>
  );
}
