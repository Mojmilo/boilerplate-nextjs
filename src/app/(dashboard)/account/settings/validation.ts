import {z} from "zod";

export const nameFormSchema = z.object({
  name: z.string().min(2, { message: "Must be 2 or more characters..." }),
});

export type NameFormType = z.infer<typeof nameFormSchema>;

export const emailFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address..." }),
  emailConfirmation: z.string().email({ message: "Invalid email address..." }),
}).refine(data => data.email === data.emailConfirmation, {
  message: "Emails must match...",
  path: ["emailConfirmation"],
});

export type EmailFormType = z.infer<typeof emailFormSchema>;