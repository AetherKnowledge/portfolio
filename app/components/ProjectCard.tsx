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
      whileHover={{ scale: 1.05 }}
      className="card bg-base-100 shadow-xl"
    >
      <figure>
        <Image
          src={proj.img}
          alt={proj.title}
          width={400}
          height={300}
          className="object-cover w-full"
        />
      </figure>
      <div className="card-body pt-2">
        <h3 className="card-title text-3xl font-semibold">{proj.title}</h3>
        <div className="flex gap-2 flex-wrap mt-1">
          {proj.tags.map((tag) => (
            <span key={tag} className="badge badge-outline">
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-2">{proj.desc}</p>

        <div className="card-actions justify-end">
          <Link
            href={proj.link}
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            View in Github
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
