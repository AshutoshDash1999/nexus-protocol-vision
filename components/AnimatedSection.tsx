
import React from 'react';
import { motion, Variants } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.6, 0.05, 0.01, 0.99],
    },
  },
};

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className, id }) => {
  return (
    <motion.section
      id={id}
      className={className}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
