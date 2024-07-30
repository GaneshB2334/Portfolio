"use client";
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

const Footer = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }else{
      controls.start("hidden");
    }
  }
  , [controls, isInView]);

  return (
    <motion.div
    ref={ref}
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
     className='w-full font-bold text-lg bg-dark-900 text-white p-10 text-center content-center'>
      &copy; {new Date().getFullYear()} Ganesh Bastapure
      Inc. All rights reserved.
    </motion.div>
  )
}

export default Footer
