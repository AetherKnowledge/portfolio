import { Project } from "@/app/generated/prisma/browser";
import { prisma } from "@/prisma/client";

const defaultProjects: Omit<Project, "id" | "createdAt" | "updatedAt">[] = [
  {
    title: "Gunrun Arena",
    tags: ["Game", "Godot", "Multiplayer"],
    description:
      "GunRun Arena is a 2D online multiplayer platformer shooter developed as part of a System Integration and Architecture course project. It combines fast-paced platforming with online shooting mechanics, allowing players to either join online multiplayer sessions or host LAN games with friends.",
    imageUrl: "/gunrun-arena/1.png",
    githubUrl: "https://github.com/AetherKnowledge/GunRun-Arena",
  },
  {
    title: "Library Management System",
    tags: ["Java", "Database", "Full-Stack"],
    description:
      "The Library Management System is a Java-based application with MySQL integration designed to manage books, users, categories, and borrowing activity in an educational or organizational library. It provides a simple but powerful way for administrators and students to interact with library resources.",
    imageUrl: "/library-system/3.png",
    githubUrl: "https://github.com/AetherKnowledge/Library-System",
  },
  {
    title: "Safehub",
    tags: ["HTML", "CSS", "Typescript", "Next.js", "Supabase"],
    description:
      "A capstone project built for La Consolacion University Philippines (LCUP) that streamlines the student counseling and development process. The system allows students to book appointments, attend video counseling sessions, view announcements, and chat with an AI chatbot when no human counselor is available.",
    imageUrl: "/safehub/1.png",
    githubUrl: "https://github.com/AetherKnowledge/capstone",
  },
  {
    title: "Akasha",
    tags: ["Kotlin", "Jetpack Compose", "Supabase", "Android", "N8N"],
    description:
      "An Android chatbot application built with Jetpack Compose and Kotlin, featuring a modern UI with markdown support for rich text conversations.",
    imageUrl: "/akasha/1.svg",
    githubUrl: "https://github.com/AetherKnowledge/akasha",
  },
];

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

const about = `
I am currently a **student developer**, and my journey in software development began the moment I wrote my first line of code. I instantly fell in love with building something from nothing, and since then, my passion for programming has only grown stronger. Every project fuels my curiosity and drives me to keep improving.

I specialize in creating **modern web applications** and **mobile solutions** that blend clean, maintainable code, thoughtful and elegant design, and continuous learning and innovation. Each project is an opportunity to **grow**, **experiment**, and **deliver meaningful results**.
`;

async function main() {
  await prisma.project.deleteMany({});
  await prisma.project.createMany({
    data: defaultProjects,
  });

  await prisma.settings.upsert({
    where: { id: 1 },
    update: {
      id: 1,
      name: "John Christian Rosuelo",
      skills: skills,
      about: about,
      job: "Software Developer",
      email: "johnchristian.rosuelo@email.lcup.edu.ph",
      github: "https://github.com/AetherKnowledge",
    },
    create: {
      id: 1,
      name: "John Christian Rosuelo",
      skills: skills,
      about: about,
      job: "Software Developer",
      email: "johnchristian.rosuelo@email.lcup.edu.ph",
      github: "https://github.com/AetherKnowledge",
    },
  });

  const projects = await prisma.project.findMany();
  console.log("✅ Seed data:", projects);
}

main()
  .catch((err) => {
    console.error("❌ Error during seeding:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
