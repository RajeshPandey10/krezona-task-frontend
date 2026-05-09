import * as z from "zod";

export const projectSchema = z.object({
  name: z
    .string()
    .min(3, "Project name must be at least 3 characters long")
    .max(120, "Project name is too long"),
  type: z
    .string()
    .min(2, "Project type must be at least 2 characters long")
    .max(80, "Project type is too long"),
  description: z.string().max(500, "Description is too long").optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;