"use client";
import ProgrammerIcon from "@/public/Programmer.png";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const scrollTo = (e) => {
    e.preventDefault();
    const element = document.getElementById(e.target.name);
    element.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="flex md:flex-col justify-evenly max-md:fixed top-0 max-md:backdrop-blur-3xl max-md:z-[60] items-center w-screen h-24 md:w-1/4 md:h-screen  bg-gradient-to-r from-dark-900 to-dark-100 z-50 text-light-100 py-8 shadow-lg shadow-dark-100 ">
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: -100,
          },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.5,
              duration: 0.5,
            },
          },
        }}
        initial="hidden"
        animate="visible"
        className="text-center"
      >
        <Image src={ProgrammerIcon} className="md:w-[200px] w-[70px]" />
      </motion.div>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            scale: 0.7,
          },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              delay: 0.5,
              duration: 0.5,
            },
          },
        }}
        initial="hidden"
        animate="visible"
        className="p-5 hidden md:block"
      >
        <div className="font-bold text-2xl ">Ganesh Bastapure</div>
        <div className="flex flex-col gap-2 my-2 text-lg">
          <div className="flex items-center hover:underline gap-2">
            <Mail />{" "}
            <a href="mailto:bastapureganesh21@gmail.com" target="_blank">
              bastapureganesh@gmail.com
            </a>
          </div>
          <div className="flex items-center hover:underline gap-2">
            <Linkedin />{" "}
            <a
              target="_blank"
              href="https://www.linkedin.com/in/ganesh-bastapure-641116257/"
            >
              Linkedin
            </a>
          </div>
          <div className="flex items-center hover:underline gap-2">
            <Github />{" "}
            <a target="_blank" href="https://github.com/GaneshB2334/">
              GitHub
            </a>
          </div>
          <div
            className="flex items-center hover:underline gap-2"
          >
            <MapPin /> <span className="">Latur</span>
          </div>
        </div>
      </motion.div>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            x: -100,
          },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              delay: 0.5,
              duration: 0.5,
            },
          },
        }}
        initial="hidden"
        animate="visible"
        className="md:flex-col text-2xl flex justify-between gap-5 md:justify-end px-5 "
      >
        <button
          name="about"
          className="hover:text-dark-100 transition-all font-bold [text-shadow:_10px_10px_2px_rgb(0_0_0_/_50%)]"
          onClick={scrollTo}
        >
          About
        </button>
        <button
          name="skills"
          className="hover:text-dark-100 transition-all font-bold [text-shadow:_10px_10px_2px_rgb(0_0_0_/_50%)]"
          onClick={scrollTo}
        >
          Skills
        </button>
        <button
          name="projects"
          className="hover:text-dark-100 transition-all font-bold [text-shadow:_10px_10px_2px_rgb(0_0_0_/_50%)]"
          onClick={scrollTo}
        >
          Projects
        </button>
      </motion.div>
    </div>
  );
};

export default Navbar;
