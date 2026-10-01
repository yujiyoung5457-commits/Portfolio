import { Footer } from "@/components/common/Footer";
import { FloatingNav } from "@/components/common/FloatingNav";
import { Header } from "@/components/common/Header";
import { AboutMe } from "@/components/sections/AboutMe";
import { AnotherProject } from "@/components/sections/AnotherProject";
import { ArtGallery } from "@/components/sections/ArtGallery";
import { ArtGalleryHeading } from "@/components/sections/ArtGalleryHeading";
import { ArtSlider } from "@/components/sections/ArtSlider";
import { CreativeStatement } from "@/components/sections/CreativeStatement";
import { DesignCode } from "@/components/sections/DesignCode";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";
import { GsapAnimation } from "@/components/sections/GsapAnimation";
import { Movie } from "@/components/sections/Movie";
import { MiniProjects } from "@/components/sections/MiniProjects";
import { Skills } from "@/components/sections/Skills";
import { TeamProjects } from "@/components/sections/TeamProjects";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <Hero />
      <AboutMe />
      <CreativeStatement />
      <Header />
      <main>
        <FeaturedProjects />
        <TeamProjects />
        <Skills />
        <DesignCode />
        <div className={styles.projectFlow}>
          <svg
            className={styles.projectFlowBackground}
            viewBox="0 0 100 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0 236 C5 216 8 263 13 239 C18 214 22 264 28 237 C34 211 38 263 44 239 C50 215 55 260 62 245 C68 330 56 391 64 462 C72 535 57 607 65 680 C72 754 58 824 63 884 C66 920 49 958 34 948 C22 939 13 970 0 951 Z" />
          </svg>
          <AnotherProject />
          <ArtGalleryHeading />
          <ArtGallery />
          <MiniProjects />
        </div>
        <ArtSlider />
        <Movie />
        <GsapAnimation />
      </main>
      <Footer />
      <FloatingNav />
    </div>
  );
}
