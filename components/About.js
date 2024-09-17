import { motion } from "framer-motion";
import { Github, LinkedinIcon, Mail } from "lucide-react";

const About = () => {
  return (
    <div className="z-50 lg:px-10 content-center pt-28 pb-16 w-full lg:py-24 flex justify-center text-white lg:h-screen">
      <div className="lg:w-2/3 ">
        <div className="p-5">
          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                x: "-50%",
              },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: 0.5,
                  duration: 0.5,
                },
              },
            }}
            initial="hidden"
            animate="visible"
            className="lg:w-2/3 flex gap-5 p-2 lg:p-5"
          >
            <span className="text-3xl lg:text-5xl font-semibold poppins-bold bg-clip-text ">
              Designing the web with{" "}
              <span className="text-3xl lg:text-5xl text-transparent font-semibold poppins-bold bg-clip-text bg-gradient-to-r from-purple-700 to-purple-400">
                creativity and innovation
              </span>{" "}
              to turn ideas into interactive art.
            </span>
          </motion.div>
          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                x: "50%",
              },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: 0.5,
                  duration: 0.5,
                },
              },
            }}
            initial="hidden"
            animate="visible"
            className="text-gray-300 text-lg lg:text-xl p-2 lg:p-5"
          >
            Hello, I am Ganesh Bastapure, a passionate web developer and
            designer. I love to create interactive and responsive websites. I am
            always eager to learn new technologies and implement them in my
            projects. I have experience in developing websites using ReactJS,
            NextJS, and TailwindCSS. I am also familiar with backend
            technologies like NodeJS, ExpressJS, and MongoDB.
          </motion.div>
          <motion.div className="m-5 flex gap-5 text-cyan-400">
            <a target="_blank" href="https://github.com/GaneshB2334/">
              <Github />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/ganesh-bastapure"
            >
              <LinkedinIcon />
            </a>
            <a href="mailto:bastapureganesh21@gmail.com" target="_blank">
              <Mail />
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
