import icons from "@/icons/export";
import { useAnimation, useInView, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

const Skills = () => {
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
    <div className="md:w-full w-screen mt-24 md:mt-10 p-5 text-light-100 z-50">
      <div id="skills"/>
      <motion.div
        ref={ref}
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
        animate={controls}
        className="w-full z-100 flex flex-wrap p-5"
      >
        {icons.map((icon, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-1/4 h-1/4 z-50 p-2 "
          >
            <Image
              className="drop-shadow-[10px_10px_2px_rgba(0,0,0,0.8)]"
              src={icon.src}
              alt={icon.iconName}
              width={100}
              height={100}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Skills;
