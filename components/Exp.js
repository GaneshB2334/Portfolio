import { motion, useAnimation, useInView } from "framer-motion";
import { SchoolIcon, WorkflowIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const experiences = [
  {
    company: "PeerBuddy",
    role: "Software Development Engineer (SDE)",
    duration: "Feb 2025 - Present",
    description:
      "Leading the frontend development by architecting scalable and high-performance user interfaces. Optimizing web applications for improved responsiveness and seamless user experience. Implementing new features using modern frontend technologies while ensuring accessibility, cross-browser compatibility, and adherence to best practices. Collaborating with backend engineers and designers to create a cohesive and engaging product. Conducting code reviews, mentoring junior developers, and continuously improving development workflows.",
  },
  {
    company: "PeerBuddy",
    role: "Frontend Developer Intern",
    duration: "Sep 2024 - Jan 2025",
    description:
      "Developed dynamic and interactive UI components using React and modern frontend frameworks, significantly enhancing the platform’s usability. Improved user experience by optimizing layouts, animations, and responsiveness for various screen sizes. Worked closely with backend developers to integrate APIs efficiently, ensuring a smooth data flow and real-time updates. Conducted UI/UX research to refine design choices and implement best practices. Assisted in debugging and troubleshooting complex frontend issues, contributing to a more robust and stable application.",
  },
];

const Exp = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      controls.start("animate");
    } else {
      controls.start("initial");
    }
  }, [isInView, controls]);

  return (
    <div ref={ref} className="z-50">
      <VerticalTimeline>
        {experiences.map((exp, index) => (
          <VerticalTimelineElement
            key={index}
            className="z-50"
            contentStyle={{
              background: "rgb(71 38 164)",
              color: "#fff",
              visibility: "visible",
            }}
            contentArrowStyle={{
              borderRight: "10px solid rgb(71 38 164)",
              visibility: "visible",
            }}
            date={exp.duration}
            iconStyle={{
              background: "rgb(71 38 164)",
              color: "#fff",
              visibility: "visible",
            }}
            icon={<WorkflowIcon className={`${index%2===0?"scale-x-[-1]":""}`} />}
          >
            <motion.div>
              <motion.h3
                variants={{
                  initial: { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
                  animate: { opacity: 1, x: 0 },
                }}
                initial="initial"
                animate={controls}
                transition={{ duration: 0.5 }}
                className="text-lg font-semibold"
              >
                {exp.role}
              </motion.h3>
              <motion.h4
                variants={{
                  initial: { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
                  animate: { opacity: 1, x: 0 },
                }}
                initial="initial"
                animate={controls}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-white"
              >
                {exp.company}
              </motion.h4>
              <ExpandableText text={exp.description} />
            </motion.div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Exp;

function ExpandableText({ text, maxHeight = 150, controls }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      setIsOverflowing(textRef.current.scrollHeight > maxHeight);
    }
  }, [text]);

  return (
    <div className="relative">
      <p
        ref={textRef}
        className={`overflow-hidden transition-all ${
          isExpanded ? "max-h-full" : `max-h-[${maxHeight}px]`
        }`}
        style={{ maxHeight: isExpanded ? "none" : `${maxHeight}px` }}
      >
        {text.split(" ").map((word, ind) => (
          <motion.span
            key={ind}
            variants={{
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
            }}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.2, delay: 0.07 * ind }}
            className="inline-block"
          >
            {word}&nbsp;
          </motion.span>
        ))}
      </p>
      {isOverflowing && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-300 mt-2 underline focus:outline-none text-sm"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
}
