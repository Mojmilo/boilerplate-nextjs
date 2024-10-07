import {z} from "zod";

export const inviteUserFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address..." }),
});

export type InviteUserFormType = z.infer<typeof inviteUserFormSchema>;