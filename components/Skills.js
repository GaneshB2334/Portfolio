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
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <div className="lg:w-full w-screen p-5 py-24 text-light-100 z-50 flex justify-center">
      <motion.div ref={ref} className="w-full lg:w-2/3 z-100 flex flex-wrap gap-10  p-5">
        {icons.map((icon, index) => (
          <motion.div
          variants={{
            "hidden": {
              scale: 0,
            },
            "visible": {
              scale: 1,
              transition: {
                delay: 0.2,
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 10,
              },
            },
          }}
            initial="hidden"
            animate={controls}
            key={index}
            className="flex flex-col items-center justify-center z-50 p-2 "
          >
            <Image
              className="drop-shadow-[10px_10px_2px_rgba(0,0,0,0.8)]"
              src={icon.src}
              alt={icon.iconName}
              width={70}
              height={70}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Skills;
