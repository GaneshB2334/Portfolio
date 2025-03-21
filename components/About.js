import { motion } from "framer-motion";
import { Github, LinkedinIcon, Mail } from "lucide-react";

const About = () => {
  const sentenceVariant = {
    hidden: { opacity: 1 },
    visible: {
      transition: { staggerChildren: 0.06 },
    },
  };

  const wordVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const text =
    "Hello, I am Ganesh Bastapure, a passionate web developer and designer. I love to create interactive and responsive websites. I am always eager to learn new technologies and implement them in my projects. I have experience in developing websites using ReactJS, NextJS, and TailwindCSS. I am also familiar with backend technologies like NodeJS, ExpressJS, and MongoDB.";

  return (
    <div className="z-50 px-5 sm:px-10 content-center pt-20 sm:pt-28 pb-12 sm:pb-16 w-full flex justify-center text-white min-h-screen">
      <div className="w-full sm:w-2/3">
        <div className="p-4 sm:p-5">
          {/* Animated Title */}
          <motion.div
            variants={sentenceVariant}
            initial="hidden"
            animate="visible"
            className="w-full flex flex-wrap justify-center sm:justify-start text-center sm:text-left"
          >
            {[
              "Designing the web with",
              "creativity and innovation",
              "to turn ideas into interactive art.",
            ].map((phrase, index) => (
              <motion.span
                key={index}
                variants={wordVariant}
                className={`block text-2xl sm:text-4xl md:text-5xl font-semibold poppins-bold ${
                  index === 1
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-purple-400"
                    : ""
                }`}
              >
                {phrase}
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            variants={sentenceVariant}
            initial="hidden"
            animate="visible"
            className="text-gray-300 text-sm sm:text-lg md:text-xl py-3 text-center sm:text-left"
          >
            {text.split(" ").map((word, index) => (
              <motion.span key={index} variants={wordVariant} className="inline-block mr-1">
                {word}
              </motion.span>
            ))}
          </motion.p>

          <motion.div className="mt-6 flex gap-4 justify-center sm:justify-start text-cyan-400">
            <a target="_blank" href="https://github.com/GaneshB2334/">
              <Github size={28} />
            </a>
            <a target="_blank" href="https://www.linkedin.com/in/ganesh-bastapure">
              <LinkedinIcon size={28} />
            </a>
            <a href="mailto:bastapureganesh21@gmail.com" target="_blank">
              <Mail size={28} />
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
