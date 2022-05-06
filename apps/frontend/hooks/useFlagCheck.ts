import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserProvider/provider";
import { getToken } from "../utils/token";
import { pushUser } from "../utils/router";
import { useRouter } from "next/router";
import { Flags } from "../utils/flagResolve";

const isAdmin = (userFlags: number) => (BigInt(userFlags) & Flags.Admin) === Flags.Admin;

export const useFlagCheck = (...flagsToCheck: bigint[]) => {
  const { state } = useContext(UserContext);
  const router = useRouter();

  const [viewBlocked, setViewBlocked] = useState(true);
  const [layoutViewBlocked, setLayoutViewBlocked] = useState(!!!getToken());

  useEffect(() => {
    (async () => {
      if (state.status !== "loaded") return;

      const userFlags: bigint[] = [];

      if (isAdmin(state.flags)) userFlags.push(Flags.Admin);

      for (const flag of flagsToCheck)
        if ((BigInt(state.flags) & flag) === flag) userFlags.push(flag);

      const hasAccess = userFlags.length;

      if (!hasAccess) return pushUser(router, "/", "useFlagCheck, no access");

      setViewBlocked(false);
      setLayoutViewBlocked(false);
    })();
  }, [state.status]);

  return { viewBlocked, layoutViewBlocked };
};
