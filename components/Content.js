import React from "react";
import Skills from "./Skills";
import Projects from "./Projects";
import About from "./About";
import Footer from "./Footer";
import Experience from "./Experience";

const Content = () => {
  return (
    <div className="bg-dark-900 w-full flex flex-col overflow-y-scroll overflow-x-hidden">
      <div id="about"/>
      <About />
      <div id="skills"/>
      <Skills />
      <div id="experience"/>
      <Experience />
      <div id="projects"/>
      <Projects />
      <Footer/>
    </div>
  );
};

export default Content;
