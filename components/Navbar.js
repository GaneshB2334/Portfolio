"use client";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollTo = (e) => {
    e.preventDefault();
    const element = document.getElementById(e.target.name);
    element.scrollIntoView({
      behavior: "smooth",
    });
    setIsOpen(false);
  };
  return (
    <div className="fixed top-0 left-0 z-[100] backdrop-blur-xl">
      <nav className="w-screen text-white p-4">
        <div className="container flex justify-between items-center h-14">
          <div className="text-3xl font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-violet-500 [text-shadow:2px_2px_2px_rgba(0,0,0,0.25)]">
              Ganesh
            </span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-cyan-600">
              Bastapure
            </span>
          </div>
          <ul className="flex max-md:hidden">
            <div className="text-xl flex justify-between gap-5 md:justify-end px-5 ">
              <button
                name="about"
                className="hover:text-dark-100 transition-all font-bold"
                onClick={scrollTo}
              >
                About
              </button>
              <button
                name="skills"
                className="hover:text-dark-100 transition-all font-bold"
                onClick={scrollTo}
              >
                Skills
              </button>
              <button
                name="experience"
                className="hover:text-dark-100 transition-all font-bold"
                onClick={scrollTo}
              >
                Experience
              </button>
              <button
                name="projects"
                className="hover:text-dark-100 transition-all font-bold"
                onClick={scrollTo}
              >
                Projects
              </button>
            </div>
          </ul>
          <div className="hidden max-md:block">
            <motion.div className="absolute right-10 top-8 z-20">
              {isOpen ? (
                <X
                  className="cursor-pointer"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                />
              ) : (
                <Menu
                  className="cursor-pointer"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                />
              )}
            </motion.div>

            <motion.div
              variants={{
                hidden: {
                  x: "100%",
                  transition: {
                    duration: 0.5,
                  },
                },
                visible: {
                  x: 0,
                  transition: {
                    duration: 0.5,
                  },
                },
              }}
              initial="hidden"
              animate={isOpen ? "visible" : "hidden"}
              className="flex flex-col top-0 right-0 absolute backdrop-blur-xl pt-24 bg-dark-900/60 justify-start items-center text-2xl gap-10 h-screen w-60 p-5"
            >
              <button
                name="about"
                className="hover:text-dark-100 transition-all font-bold"
                onClick={scrollTo}
              >
                About
              </button>
              <button
                name="skills"
                className="hover:text-dark-100 transition-all font-bold"
                onClick={scrollTo}
              >
                Skills
              </button>
              <button
                name="experience"
                className="hover:text-dark-100 transition-all font-bold"
                onClick={scrollTo}
              >
                Experience
              </button>
              <button
                name="projects"
                className="hover:text-dark-100 transition-all font-bold"
                onClick={scrollTo}
              >
                Projects
              </button>
            </motion.div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
