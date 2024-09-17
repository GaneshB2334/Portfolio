"use client";
import { motion } from 'framer-motion';

const Footer = () => {

  return (
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
    animate="visible"
     className='w-full font-bold text-lg bg-dark-900 text-white p-10 text-center content-center'>
      &copy; {new Date().getFullYear()} Ganesh Bastapure
      Inc. All rights reserved.
    </motion.div>
  )
}

export default Footer
