import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserProvider/provider";
import { getToken } from "../utils/token";
import { pushUser } from "../utils/router";
import { useRouter } from "next/router";
import { Flags } from "../utils/flagResolve";

const isAdmin = (userFlags: number) => (BigInt(userFlags) & Flags.Admin) === Flags.Admin;

export const useFlagCheck = (...neededFlags: bigint[]) => {
  const { state } = useContext(UserContext);
  const router = useRouter();

  const [viewBlocked, setViewBlocked] = useState(true);
  const [layoutViewBlocked, setLayoutViewBlocked] = useState(!!!getToken());

  useEffect(() => {
    (async () => {
      if (state.status !== "loaded") return;

      const totalNeeded = neededFlags.reduce((acc, curr) => acc | curr);

      const hasAccess = isAdmin(state.flags) || (BigInt(state.flags) & totalNeeded) === totalNeeded;

      if (!hasAccess) return pushUser(router, "/", "useFlagCheck, no access");

      setViewBlocked(false);
      setLayoutViewBlocked(false);
    })();
  }, [state.status]);

  return { viewBlocked, layoutViewBlocked };
};
