import { z } from "zod";

export const formSchema = z.object({
  password: z.string(),
});

export type FormSchema = z.infer<typeof formSchema>;
