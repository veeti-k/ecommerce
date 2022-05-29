import { z } from "zod";

export const register = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export type IRegisterBody = z.infer<typeof register>;
