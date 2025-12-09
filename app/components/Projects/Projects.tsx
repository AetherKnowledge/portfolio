import { Project } from "@/app/generated/prisma/client";
import NewProjectButton from "./NewProjectButton";
import ProjectCard from "./ProjectCard";

const Projects = ({
  projects,
  isAdmin = false,
}: {
  projects: Project[];
  isAdmin?: boolean;
}) => {
  const sortedProjects = projects.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

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

      {isAdmin && (
        <div className="flex justify-center mb-8">
          <NewProjectButton />
        </div>
      )}

      {sortedProjects.length === 0 ? (
        <div className="text-center py-20">
          <div className="inline-block p-8 bg-base-200/50 backdrop-blur-sm rounded-3xl border border-base-300/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-20 h-20 mx-auto mb-4 text-base-content/30"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
              />
            </svg>
            <h3 className="text-2xl font-bold mb-2 text-base-content/70">
              No Projects Yet
            </h3>
            <p className="text-base-content/50">
              {isAdmin
                ? "Click the Add Project button to create your first project"
                : "Projects will be showcased here soon"}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {sortedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} isAdmin={isAdmin} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
