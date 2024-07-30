import { motion, useAnimation, useInView } from "framer-motion";
import { Github, Linkedin, LinkedinIcon, Mail } from "lucide-react";
import { useEffect, useRef } from "react";

const About = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, isInView]);

  return (
    <div className="z-50 px-5 max-md:mt-24 h-screen content-center text-white">
      <div ref={ref} className="p-5">
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
          animate={controls}
          className="w-2/3 flex gap-5 p-2 md:p-5"
        >
          <span className="text-3xl md:text-5xl text-white font-semibold poppins-bold bg-clip-text ">
            Designing the web with{" "}
            <span className="text-3xl md:text-5xl text-transparent font-semibold poppins-bold bg-clip-text bg-gradient-to-r from-purple-700 to-purple-400">
              creativity and innovation
            </span>{" "}
            to turn ideas into interactive art.
          </span>
        </motion.div>
        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              x: 100,
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
          animate={controls}
          className="text-white text-lg md:text-xl p-2 md:p-5"
        >
          Hello, I am Ganesh Bastapure, a passionate web developer and designer.
          I love to create interactive and responsive websites. I am always
          eager to learn new technologies and implement them in my projects. I
          have experience in developing websites using ReactJS, NextJS, and
          TailwindCSS. I am also familiar with backend technologies like NodeJS,
          ExpressJS, and MongoDB.
        </motion.div>
        <motion.div className="m-5 flex gap-5 md:hidden">
          <a target="_blank" href="https://github.com/GaneshB2334/">
            <Github />
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/ganesh-bastapure-641116257/"
          >
            <LinkedinIcon />
          </a>
          <a href="mailto:bastapureganesh21@gmail.com" target="_blank">
            <Mail />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
