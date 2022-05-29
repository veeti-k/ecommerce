import { z } from "zod";

export const createAddress = z.object({
  name: z.string(),
  phoneNumber: z.string(),
  email: z.string().email(),
  streetAddress: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
});

export type ICreateAddressBody = z.infer<typeof createAddress>;
