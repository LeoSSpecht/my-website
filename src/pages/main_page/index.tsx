import React from "react";
import Header from "../../components/header";
import { Footer } from "../../components/footer";
import { AboutMe } from "../../components/aboutMe";
import { Experiences } from "../../components/experiences/experiences";
import { Skills } from "../../components/skills";
import Projects from "../../components/projects/projects";

export const MainPage = () => {
  return (
    <div className="App">
      <Header />
      <AboutMe id="aboutMe" />
      <Experiences id="experiences" />
      <Skills id="skills" />
      <Projects id="projects" />
      <Footer />
    </div>
  );
};
