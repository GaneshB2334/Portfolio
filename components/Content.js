import React from "react";
import Skills from "./Skills";
import Projects from "./Projects";
import About from "./About";
import Footer from "./Footer";

const Content = () => {
  return (
    <div className="bg-dark-900 w-full min-h-screen flex flex-col overflow-y-scroll">
      <div id="about"/>
      <About />
      <div id="skills"/>
      <Skills />
      <div id="projects"/>
      <Projects />
      <Footer/>
    </div>
  );
};

export default Content;
