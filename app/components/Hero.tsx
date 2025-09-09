"use client";

import { motion } from "motion/react";
import { FaCode } from "react-icons/fa6";
import Marquee from "./Marquee";

const Hero = () => {
  const skills = [
    "HTML",
    "CSS",
    "Typescript",
    "Next.js",
    "React",
    "Java",
    "C#",
    "Python",
    "Visual Basic",
    "Godot",
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="flex flex-col lg:flex-row items-center justify-between px-12 py-24 max-w-[1280px] mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg max-h"
        >
          <div className="text-4xl font-bold pb-3">
            <span>Hello</span>
            <span className="text-primary">.</span>
          </div>
          <h3 className="text-3xl">I’m John Christian Rosuelo</h3>
          <h1 className="text-5xl font-bold mt-2">Software Developer</h1>
          <div className="flex gap-4 mt-10">
            <a href="#contact" className="btn btn-primary w-35 shadow-xl">
              Got a project?
            </a>
            <a
              href="#projects"
              className="btn btn-outline btn-primary w-35 shadow-xl"
            >
              My Work
            </a>
          </div>
        </motion.div>

        {/* Hidden when not on mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-10 hidden lg:block lg:mt-0"
        >
          <FaCode className="w-80 h-80" />
        </motion.div>
      </section>

      {/* Skills Bar */}
      <div className="overflow-hidden border-t border-b border-base-300 bg-base-100/50 px-6 py-6">
        <Marquee items={skills} from={0} to={"-100%"} />
      </div>
    </>
  );
};

export default Hero;
