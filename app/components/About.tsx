"use client";
import { Settings } from "@/app/generated/prisma/browser";
import { motion } from "motion/react";
import ReactMarkdown from "react-markdown";

type Specialty = {
  icon: string;
  title: string;
};

const About = ({ settings }: { settings: Settings | null }) => {
  const about = `
I am currently a **student developer**, and my journey in software development began the moment I wrote my first line of code. I instantly fell in love with building something from nothing, and since then, my passion for programming has only grown stronger. Every project fuels my curiosity and drives me to keep improving.

I specialize in creating **modern web applications** and **mobile solutions** that blend clean, maintainable code, thoughtful and elegant design, and continuous learning and innovation. Each project is an opportunity to **grow**, **experiment**, and **deliver meaningful results**.
`;
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
      className="px-12 py-32 grid md:grid-cols-2 gap-16 max-w-[1280px] mx-auto"
    >
      <div className="flex justify-center items-center">
        <div className="space-y-6 w-full">
          {specialties.map((spec, index) => (
            <motion.div
              className="group relative flex items-center gap-6 backdrop-blur-sm bg-base-100/80 border border-base-300/50 shadow-xl hover:shadow-2xl py-8 px-10 rounded-3xl overflow-hidden transition-all duration-300"
              key={spec.title}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: index * 0.15,
              }}
              whileHover={{
                scale: 1.02,
                x: 10,
                transition: { type: "spring", stiffness: 400, damping: 10 },
              }}
              whileTap={{
                scale: 0.98,
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

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col justify-center space-y-8"
      >
        <div>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
        </div>

        <div className="space-y-6 text-lg text-base-content/80 leading-relaxed">
          {settings ? (
            <div className="prose max-w-none prose-p:mb-6">
              <ReactMarkdown>{about}</ReactMarkdown>
            </div>
          ) : (
            <p>
              I am currently a student, and my journey in software development
              began the first time I wrote code. I instantly fell in love with
              the process of creating something from scratch, and since then, my
              passion for coding has only grown.
            </p>
          )}

          <div className="pt-4">
            <a
              href="#contact"
              className="btn btn-primary btn-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all gap-2"
            >
              <span>Get in Touch</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
