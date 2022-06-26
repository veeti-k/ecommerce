import { NextPage } from "next";

import { Flags } from "@ecommerce/shared";

export type Page = NextPage & {
  requireAuth: boolean;
  requiredFlags?: Flags[];
};
