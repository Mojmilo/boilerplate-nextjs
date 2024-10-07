import {z} from "zod";

export const nameSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export type NameSchema = z.infer<typeof nameSchema>;

export const slugSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
});
export type SlugSchema = z.infer<typeof slugSchema>;