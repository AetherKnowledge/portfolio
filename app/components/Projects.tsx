import ProjectCard from "./ProjectCard";

type Project = {
  title: string;
  tags: string[];
  desc: string;
  img: string;
  link: string;
};

const Projects = () => {
  const projects: Project[] = [
    {
      title: "Gunrun Arena",
      tags: ["Game", "Godot", "Multiplayer"],
      desc: "GunRun Arena is a 2D online multiplayer platformer shooter developed as part of a System Integration and Architecture course project. It combines fast-paced platforming with online shooting mechanics, allowing players to either join online multiplayer sessions or host LAN games with friends.",
      img: "/gunrun-arena/1.png",
      link: "https://github.com/AetherKnowledge/GunRun-Arena",
    },
    {
      title: "Library Management System",
      tags: ["Java", "Database", "Full-Stack"],
      desc: "The Library Management System is a Java-based application with MySQL integration designed to manage books, users, categories, and borrowing activity in an educational or organizational library. It provides a simple but powerful way for administrators and students to interact with library resources.",
      img: "/library-system/3.png",
      link: "https://github.com/AetherKnowledge/Library-System",
    },
    {
      title: "Safehub",
      tags: ["HTML", "CSS", "Typescript", "Next.js", "Supabase"],
      desc: "A capstone project built for La Consolacion University Philippines (LCUP) that streamlines the student counseling and development process. The system allows students to book appointments, attend video counseling sessions, view announcements, and chat with an AI chatbot when no human counselor is available.",
      img: "/safehub/1.png",
      link: "https://github.com/AetherKnowledge/capstone",
    },
    {
      title: "Akasha",
      tags: ["Kotlin", "Jetpack Compose", "Supabase", "Android", "N8N"],
      desc: "An Android chatbot application built with Jetpack Compose and Kotlin, featuring a modern UI with markdown support for rich text conversations.",
      img: "/akasha/1.svg",
      link: "https://github.com/AetherKnowledge/akasha",
    },
  ];

  return (
    <section id="projects" className="px-12 py-32 max-w-[1280px] mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block">
          Featured Projects
        </h2>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          A collection of projects showcasing my skills and passion for
          development
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {projects.map((proj, index) => (
          <ProjectCard key={index} proj={proj} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
