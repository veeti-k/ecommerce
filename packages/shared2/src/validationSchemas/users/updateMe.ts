import { z } from "zod";

export const updateMe = z.object({
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
});

export type IUpdateMeBody = z.infer<typeof updateMe>;
