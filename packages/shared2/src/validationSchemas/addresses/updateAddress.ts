import { z } from "zod";
import { createAddress } from "./createAddress";

export const updateAddress = createAddress;

export type IUpdateAddressBody = z.infer<typeof updateAddress>;
