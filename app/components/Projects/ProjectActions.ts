"use server";

import { Project } from "@/app/generated/prisma/client";
import { getUser } from "@/lib/supabase/auth-actions";
import {
  createFile,
  createTemporaryFolder,
  deleteFolder,
} from "@/lib/supabase/bucketUtils";
import { Buckets, getBucket } from "@/lib/supabase/server";
import { prisma } from "@/prisma/client";
import { prettifyError } from "zod";
import ActionResult from "../ActionResult";
import { updateProjectSchema } from "./schema";

export async function getProjects(): Promise<Project[]> {
  try {
    const projects = await prisma.project.findMany();
    return projects;
  } catch (err) {
    console.error("Error fetching projects:", err);
    return [];
  }
}

export async function createProject(): Promise<ActionResult<void>> {
  try {
    const user = await getUser();
    if (!user) {
      return { success: false, message: "Unauthorized" };
    }

    await prisma.project.create({
      data: {
        title: "New Project",
        description: "Project Description",
        tags: [],
        githubUrl: "",
      },
    });

    return { success: true };
  } catch (err) {
    console.error("Error creating project:", err);
    return {
      success: false,
      message: err instanceof Error ? err.message : "Failed to create project.",
    };
  }
}

export async function updateProject(
  data: FormData
): Promise<ActionResult<void>> {
  try {
    const user = await getUser();
    if (!user) {
      return { success: false, message: "Unauthorized" };
    }

    const validation = updateProjectSchema.safeParse(Object.fromEntries(data));
    if (!validation.success) {
      return {
        success: false,
        message: prettifyError(validation.error),
      };
    }
    const {
      projectId,
      projectTitle,
      projectDescription,
      projectTags,
      projectImage,
      projectGithubUrl,
    } = validation.data;

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return { success: false, message: "Project not found." };
    }

    console.log(validation.data);
    let imageUrl: string | undefined = undefined;
    if (projectImage) {
      const bucket = await getBucket(Buckets.Projects);

      // if there is an existing image, move it to a temporary folder
      if (project.imageUrl) {
        await createTemporaryFolder(
          project.id.toString(),
          project.id.toString() + "_old",
          bucket,
          [project.imageUrl]
        );
      }

      await createFile(
        projectImage,
        bucket,
        Buckets.Projects,
        project.id.toString(),
        project.id.toString(),
        true,
        true
      )
        .then((url) => {
          imageUrl = url;
        })
        .catch(async (err) => {
          // if upload fails, restore the old image
          console.error("Error uploading new image, restoring old image:", err);
          await deleteFolder(project.id.toString(), bucket);
          await createTemporaryFolder(
            project.id.toString() + "_old",
            project.id.toString(),
            bucket
          );
          throw err;
        });
    }

    // Update the project in the database
    await prisma.project.update({
      where: { id: projectId },
      data: {
        title: projectTitle,
        description: projectDescription,
        tags: projectTags,
        githubUrl: projectGithubUrl,
        imageUrl,
      },
    });

    await deleteFolder(
      project.id.toString() + "_old",
      await getBucket(Buckets.Projects)
    );

    return { success: true };
  } catch (err) {
    console.error("Error updating project:", err);
    return {
      success: false,
      message: err instanceof Error ? err.message : "Failed to update project.",
    };
  }
}

export async function deleteProject(
  projectId: number
): Promise<ActionResult<void>> {
  try {
    const user = await getUser();
    if (!user) {
      return { success: false, message: "Unauthorized" };
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project) {
      return { success: false, message: "Project not found." };
    }
    const bucket = await getBucket(Buckets.Projects);

    // Delete project image from storage
    if (project.imageUrl) {
      await deleteFolder(project.id.toString(), bucket);
    }
    // Delete project from database
    await prisma.project.delete({
      where: { id: projectId },
    });
    return { success: true };
  } catch (err) {
    console.error("Error deleting project:", err);
    return {
      success: false,
      message: err instanceof Error ? err.message : "Failed to delete project.",
    };
  }
}
