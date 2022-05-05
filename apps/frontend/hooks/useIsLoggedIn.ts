import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserProvider/provider";
import { logout } from "../utils/logout";
import { request } from "../utils/requests";
import { apiRoutes } from "../utils/routes";
import { getToken } from "../utils/token";

export const useIsLoggedIn = () => {
  const [viewBlocked, setViewBlocked] = useState(!!getToken());

  const router = useRouter();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      if (state.userId) return setViewBlocked(false);

      const res = await request({
        path: apiRoutes.userRoot("me"),
        method: "GET",
      });

      if (!res) logout(router, dispatch, "/");

      setViewBlocked(false);
    })();
  }, []);

  return viewBlocked;
};
