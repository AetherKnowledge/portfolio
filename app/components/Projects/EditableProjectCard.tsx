"use client";

import { X } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Project } from "../../generated/prisma/client";
import { usePopup } from "../Popup/PopupProvider";
import ImageWithFallback from "./ImageWithFallback";
import { deleteProject, updateProject } from "./ProjectActions";

const EditableProjectCard = ({
  project,
  onSwitchMode,
}: {
  project: Project;
  onSwitchMode?: () => void;
}) => {
  const [tags, setTags] = useState<string[]>(project.tags);
  const [newTag, setNewTag] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(
    project.imageUrl
  );
  const [imageUpdated, setImageUpdated] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const statusPopup = usePopup();
  const router = useRouter();

  const handleImageChange = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setImageUpdated(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageChange(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    formData.set("projectTags", JSON.stringify(tags));
    if (!imageUpdated) {
      formData.delete("projectImage");
    }

    const result = await updateProject(formData);
    setLoading(false);

    if (!result.success) {
      statusPopup.showError(result.message || "Failed to update project.");
      return;
    }

    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      if (onSwitchMode) onSwitchMode();
    }, 1000);
    router.refresh();
  }

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
    <motion.form
      key={project.title}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group card bg-base-100 shadow-xl hover:shadow-2xl border border-base-300/50 rounded-3xl overflow-hidden transition-all duration-300"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="projectId" value={project.id} readOnly />
      <figure
        className={`relative overflow-hidden h-64 group/image cursor-pointer ${
          isDragging ? "ring-4 ring-primary" : ""
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <ImageWithFallback
          src={imagePreview}
          alt={project.title}
          width={400}
          height={300}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
        <label className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity cursor-pointer">
          <input
            type="file"
            name="projectImage"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageChange(file);
            }}
          />
          <div className="bg-base-100/90 backdrop-blur-sm rounded-2xl px-6 py-4 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8 mx-auto mb-2 text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
            <p className="text-sm font-semibold">Click or drag to upload</p>
            <p className="text-xs text-base-content/70 mt-1">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </label>
      </figure>
      <div className="card-body p-8">
        <input
          type="text"
          name="projectTitle"
          defaultValue={project.title}
          className="card-title text-3xl font-bold group-hover:text-primary transition-colors bg-transparent outline-none ring-0 focus:outline-1 focus:outline-base-content/20 rounded px-2 -mx-2"
          required
        />
        <div className="space-y-3 mt-3">
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="badge badge-primary badge-outline font-semibold gap-2 pr-1"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:text-error transition-colors"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag();
                }
              }}
              className="input input-sm input-bordered flex-1"
              placeholder="Add tag..."
            />
            <button
              type="button"
              onClick={addTag}
              className="btn btn-sm btn-primary"
            >
              Add
            </button>
          </div>
          <input type="hidden" name="tags" value={JSON.stringify(tags)} />
        </div>
        <textarea
          name="projectDescription"
          className="mt-4 w-full text-base-content/80 leading-relaxed resize-none outline-base-content/20 focus:outline-1 bg-transparent"
          defaultValue={project.description}
          rows={4}
          required
        />

        <div className="space-y-3 mt-6 w-full">
          <label className="text-sm font-semibold text-base-content/90 w-full">
            GitHub URL
          </label>
          <label className="input input-bordered flex items-center gap-2 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
              />
            </svg>
            <input
              type="url"
              name="projectGithubUrl"
              defaultValue={project.githubUrl}
              className="grow text-sm"
              placeholder="https://github.com/..."
              required
            />
          </label>
        </div>

        <div className="card-actions justify-between mt-6 gap-2">
          <div className="flex gap-2">
            <button
              type="button"
              className="btn btn-outline btn-error gap-2 hover:gap-3 transition-all"
              onClick={handleDelete}
              disabled={deleting || loading || saved}
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
          <button
            type="submit"
            className="btn btn-success gap-2 hover:gap-3 transition-all shadow-lg hover:shadow-xl"
            disabled={loading || saved}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                <span>Saving...</span>
              </>
            ) : saved ? (
              <>
                <span>Saved!</span>
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
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </>
            ) : (
              <>
                <span>Save Changes</span>
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
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.form>
  );
};

export default EditableProjectCard;
