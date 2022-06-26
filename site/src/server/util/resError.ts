import * as trpc from "@trpc/server";
import { TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc";

interface Props {
  code: TRPC_ERROR_CODE_KEY;
  message: string;
}

export const resError = ({ code, message }: Props) => {
  throw new trpc.TRPCError({
    code,
    message,
  });
};
