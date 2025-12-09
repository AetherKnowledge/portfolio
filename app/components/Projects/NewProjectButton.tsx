"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePopup } from "../Popup/PopupProvider";
import { createProject } from "./ProjectActions";

const NewProjectButton = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const statusPopup = usePopup();

  async function handleClick() {
    setIsLoading(true);
    const result = await createProject();
    setIsLoading(false);

    if (!result.success) {
      statusPopup.showError(result.message || "Failed to create project.");
      return;
    }

    router.refresh();
  }

  return (
    <button
      className="btn btn-primary gap-2 hover:gap-3 transition-all shadow-lg hover:shadow-xl"
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <span className="loading loading-spinner loading-sm"></span>
          <span>Creating...</span>
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span>Add Project</span>
        </>
      )}
    </button>
  );
};

export default NewProjectButton;
