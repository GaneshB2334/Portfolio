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
    }else{
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <div className="z-50 px-5 py-24">
      <motion.div
        ref={ref}
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
        className="z-[50] flex gap-5 w-full p-5 justify-center items-center flex-wrap"
      >
        {projects.map((project, index) => (
          <Project
            key={index}
            Link={project.Link}
            ProjectImage={project.ProjectImage}
            description={project.description}
            gitHub={project.gitHub}
            title={project.title}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Projects;
