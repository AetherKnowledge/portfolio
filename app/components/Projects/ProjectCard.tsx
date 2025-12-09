"use client";

import { useState } from "react";
import { Project } from "../../generated/prisma/client";
import EditableProjectCard from "./EditableProjectCard";
import ProjectCardDisplay from "./ProjectCardDisplay";

const ProjectCard = ({
  project,
  isAdmin = false,
}: {
  project: Project;
  isAdmin?: boolean;
}) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      {editMode ? (
        <EditableProjectCard
          project={project}
          onSwitchMode={() => setEditMode(false)}
        />
      ) : (
        <ProjectCardDisplay
          project={project}
          onSwitchMode={() => setEditMode(true)}
          isAdmin={isAdmin}
        />
      )}
    </>
  );
};

export default ProjectCard;
