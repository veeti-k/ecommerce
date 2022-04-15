import { IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../../UserProvider/provider";
import { isAdmin } from "../../utils/flagResolve";
import { logout } from "../../utils/logout";
import { routes } from "../../utils/routes";
import { DashboardIcon, LoginIcon, LogoutIcon, UserIcon } from "../Icons";
import { Link } from "../Link";
import { Text } from "../Text";

export const ProfileMenu = () => {
  const router = useRouter();

  const { state, dispatch } = useContext(UserContext);

  if (!state.id)
    return (
      <Menu>
        <MenuButton aria-label="User menu" as={IconButton} icon={<UserIcon />} />

        <MenuList>
          <Link href={routes.login}>
            <MenuItem icon={<LoginIcon />}>
              <Text>Login</Text>
            </MenuItem>
          </Link>
        </MenuList>
      </Menu>
    );

  return (
    <Menu>
      <MenuButton aria-label="User menu" as={IconButton} icon={<UserIcon />} />

      <MenuList>
        <Link href={routes.settingsAccount}>
          <MenuItem icon={<UserIcon />}>
            <Text>Account</Text>
          </MenuItem>
        </Link>

        {isAdmin(state.flags) && (
          <Link href={routes.management}>
            <MenuItem icon={<DashboardIcon />}>
              <Text>Management</Text>
            </MenuItem>
          </Link>
        )}

        <MenuItem icon={<LogoutIcon />} onClick={() => logout(router, dispatch, routes.home)}>
          <Text>Logout</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};