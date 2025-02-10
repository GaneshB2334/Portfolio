"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const experiences = [
  {
    company: "PeerBuddy",
    role: "Software Development Engineer (SDE)",
    duration: "Feb 2025 - Present",
    description:
      "Leading frontend development, optimizing performance, and implementing new features.",
  },
  {
    company: "PeerBuddy",
    role: "Frontend Developer Intern",
    duration: "Sep 2024 - Jan 2025",
    description:
      "Built dynamic UI components, improved UX, and collaborated with backend developers.",
  },
];

const Experience = () => {
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
    <section className="z-50 lg:px-10 content-center pt-28 pb-16 w-[80%] m-auto lg:w-full lg:py-24 flex justify-center text-white ">
      <div ref={ref} className="space-y-6">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: {
                opacity: 0,
                y: 20,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: index * 0.5,
                  duration: index * 0.5,
                },
              },
            }}
            initial="hidden"
            animate={controls}
            className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
            <p className="text-gray-400">
              {exp.company} | {exp.duration}
            </p>
            <p className="mt-2 text-gray-300">{exp.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
