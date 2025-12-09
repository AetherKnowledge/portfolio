import z from "zod";

export const IMAGE_SCHEMA = z
  .instanceof(File)
  .refine(
    (file) =>
      [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/gif",
        "image/webp",
        "image/svg+xml",
      ].includes(file.type),
    { message: "Invalid image file type" }
  );

export const updateProjectSchema = z.object({
  projectId: z.coerce.number(),
  projectTitle: z.string().min(1).max(100),
  projectDescription: z.string().min(1).max(1000),
  projectImage: IMAGE_SCHEMA.optional(),
  projectGithubUrl: z.url(),
  projectTags: z
    .string()
    .transform((val) => JSON.parse(val))
    .pipe(z.array(z.string().min(1).max(30)).max(10)),
});
export type UpdateProjectData = z.infer<typeof updateProjectSchema>;
