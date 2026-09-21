import { Footer } from "@/components/common/Footer";
import { FloatingNav } from "@/components/common/FloatingNav";
import { Header } from "@/components/common/Header";
import { AboutMe } from "@/components/sections/AboutMe";
import { AnotherProject } from "@/components/sections/AnotherProject";
import { ArtGallery } from "@/components/sections/ArtGallery";
import { ArtSlider } from "@/components/sections/ArtSlider";
import { CreativeStatement } from "@/components/sections/CreativeStatement";
import { DesignCode } from "@/components/sections/DesignCode";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";
import { Movie } from "@/components/sections/Movie";
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
        <AnotherProject />
        <ArtGallery />
        <ArtSlider />
        <Movie />
      </main>
      <Footer />
      <FloatingNav />
    </div>
  );
}
