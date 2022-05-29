import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserProvider/provider";
import { request } from "../utils/requests";
import { Logout } from "../utils/Requests/Auth";
import { apiRoutes } from "../utils/routes";
import { getToken } from "../utils/token";

export const useIsLoggedIn = () => {
  const [viewBlocked, setViewBlocked] = useState(!!getToken());

  const router = useRouter();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      if (state_id) return setViewBlocked(false);

      const res = await request({
        path: apiRoutes.userRoot("me"),
        method: "GET",
      });

      if (!res) Logout(router, dispatch, "/");

      setViewBlocked(false);
    })();
  }, []);

  return viewBlocked;
};
