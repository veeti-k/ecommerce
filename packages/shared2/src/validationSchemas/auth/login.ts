import { z } from "zod";

export const login = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type ILoginBody = z.infer<typeof login>;
