"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

type Project = {
  title: string;
  tags: string[];
  desc: string;
  img: string;
  link: string;
};

const ProjectCard = ({ proj }: { proj: Project }) => {
  return (
    <motion.div
      key={proj.title}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group card bg-base-100 shadow-xl hover:shadow-2xl border border-base-300/50 rounded-3xl overflow-hidden transition-all duration-300"
    >
      <figure className="relative overflow-hidden h-64">
        <Image
          src={proj.img}
          alt={proj.title}
          width={400}
          height={300}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
      </figure>
      <div className="card-body p-8">
        <h3 className="card-title text-3xl font-bold group-hover:text-primary transition-colors">
          {proj.title}
        </h3>
        <div className="flex gap-2 flex-wrap mt-3">
          {proj.tags.map((tag) => (
            <span
              key={tag}
              className="badge badge-primary badge-outline font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-4 text-base-content/80 leading-relaxed">{proj.desc}</p>

        <div className="card-actions justify-end mt-6">
          <Link
            href={proj.link}
            className="btn btn-primary gap-2 hover:gap-3 transition-all shadow-lg hover:shadow-xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>View on GitHub</span>
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
                d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
