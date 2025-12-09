import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Project } from "../../generated/prisma/client";
import { usePopup } from "../Popup/PopupProvider";
import ImageWithFallback from "./ImageWithFallback";
import { deleteProject } from "./ProjectActions";

const ProjectCardDisplay = ({
  project,
  onSwitchMode,
  isAdmin = false,
}: {
  project: Project;
  onSwitchMode?: () => void;
  isAdmin?: boolean;
}) => {
  const router = useRouter();
  const statusPopup = usePopup();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    const result = await deleteProject(project.id);
    if (!result.success) {
      setDeleting(false);
      statusPopup.showError(result.message || "Failed to delete project.");
      return;
    }
    router.refresh();
  }

  return (
    <motion.div
      key={project.title}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group card bg-base-100 shadow-xl hover:shadow-2xl border border-base-300/50 rounded-3xl overflow-hidden transition-all duration-300"
    >
      <figure className="relative overflow-hidden h-64">
        <ImageWithFallback
          src={project.imageUrl}
          alt={project.title}
          width={400}
          height={300}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
      </figure>
      <div className="card-body p-8">
        <h3 className="card-title text-3xl font-bold group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <div className="flex gap-2 flex-wrap mt-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="badge badge-primary badge-outline font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-4 text-base-content/80 leading-relaxed">
          {project.description}
        </p>

        <div className="card-actions justify-between mt-6 gap-2">
          {isAdmin && onSwitchMode && (
            <div className="flex gap-2">
              <button
                onClick={onSwitchMode}
                className="btn btn-outline gap-2 hover:gap-3 transition-all"
              >
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
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                <span>Edit</span>
              </button>
              <button
                className="btn btn-outline btn-error gap-2 hover:gap-3 transition-all"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
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
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                    <span>Delete</span>
                  </>
                )}
              </button>
            </div>
          )}
          <Link
            href={project.githubUrl}
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

export default ProjectCardDisplay;
