import {z} from "zod";

export const signupFormSchema = z.object({
  name: z.string().min(2, { message: "Must be 2 or more characters..." }),
  email: z.string().email({ message: "Invalid email address" }),
});

export type SignupFormType = z.infer<typeof signupFormSchema>;

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;