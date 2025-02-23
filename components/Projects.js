import projects from "@/lib/projectData";
import { motion, useAnimation, useInView } from "framer-motion";
import Project from "./Project";
import { useEffect, useRef } from "react";

const Projects = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <div ref={ref} className="z-50 px-5 py-24 flex flex-wrap md:grid grid-cols-2 md:w-[60vw] mx-auto gap-5">
      {projects.map((project, index) => (
        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              scale: 0.5,
            },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                delay: index * 0.5,
                duration: 0.5,
              },
            },
          }}
          key={index}
          initial="hidden"
          animate={controls}
          className="z-[50] flex gap-5 w-full p-5 justify-center items-center flex-wrap"
        >
          <Project
            key={index}
            Link={project.Link}
            ProjectImage={project.ProjectImage}
            description={project.description}
            gitHub={project.gitHub}
            title={project.title}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default Projects;
