"use client";
import { motion } from "motion/react";

type Specialty = {
  icon: string;
  title: string;
};

const About = () => {
  const specialties: Specialty[] = [
    {
      icon: "💻",
      title: "Website Development",
    },
    {
      icon: "📱",
      title: "App Development",
    },
    {
      icon: "☁️",
      title: "Website Hosting",
    },
  ];

  return (
    <section
      id="about"
      className="px-12 py-20 grid md:grid-cols-2 gap-12 max-w-[1280px] mx-auto"
    >
      <div className="flex justify-center items-center ">
        <div className="space-y-6">
          {specialties.map((spec, index) => (
            <motion.div
              className="flex items-center gap-4 shadow-xl py-5 px-10 rounded-2xl"
              key={spec.title}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring", // initial animation uses spring for bouncy feel
                stiffness: 100,
                damping: 20,
                delay: index * 0.4,
              }}
              whileHover={{
                scale: 1.05,
                transition: { type: "tween", duration: 0.1, ease: "easeOut" },
              }}
              whileTap={{
                scale: 1,
                transition: { type: "tween", duration: 0.1, ease: "easeOut" },
              }}
            >
              <div className="avatar w-18 h-18 bg-base-300 rounded-full items-center justify-center">
                <div className="text-4xl w-12 h-12 text-center rounded-full">
                  {spec.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold">{spec.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-4">About me</h2>
        <p className="mb-6">
          I am currently a student, and my journey in software development began
          the first time I wrote code. I instantly fell in love with the process
          of creating something from scratch, and since then, my passion for
          coding has only grown.
        </p>
      </div>
    </section>
  );
};

export default About;
