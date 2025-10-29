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
      img: "/akasha/1.png",
      link: "https://github.com/AetherKnowledge/akasha",
    },
  ];

  return (
    <section id="projects" className="px-12 py-20 max-w-[1280px] mx-auto pt-5">
      <h2 className="text-3xl font-bold mb-10 w-full text-center">Projects</h2>
      <div className="grid md:grid-cols-2 gap-12">
        {projects.map((proj, index) => (
          <ProjectCard key={index} proj={proj} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
