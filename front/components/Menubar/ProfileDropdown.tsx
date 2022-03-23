import { keyframes } from "@stitches/react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Button } from "@chakra-ui/react";
import { styled } from "../../stitches.config";

import { MdOutlineLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { pushUser } from "../../utils/router";
import { useRouter } from "next/router";
import Link from "next/link";
import { LoginIcon, UserIcon } from "../Icons";
import { routes } from "../../utils/routes";
import { useContext } from "react";
import { UserContext } from "../../UserProvider/provider";
import { logout } from "../../utils/logout";
import { useIsLoggedIn } from "../../hooks/useIsLoggedIn";

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(3px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-3px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-3px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(3px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuContent = styled(DropdownMenuPrimitive.Content, {
  minWidth: "230px",
  boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
  padding: "0.5rem",
  borderRadius: "0.5rem",
  backgroundColor: "white",

  animationDuration: "400ms",
  animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  animationFillMode: "forwards",
  willChange: "transform, opacity",
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: slideUpAndFade },
    '&[data-side="left"]': { animationName: slideRightAndFade },
  },
});

const DropdownMenuItem = styled(DropdownMenuPrimitive.Item, {
  all: "unset",
  position: "relative",
  display: "flex",
  alignItems: "center",
  borderRadius: "0.2rem",
  transition: "$buttonHover",
  padding: "0.5rem",
  gap: "0.8rem",

  "&:focus": {
    backgroundColor: "#ededed",
    border: "none",
    cursor: "pointer",
  },
});

const DropdownMenuArrow = styled(DropdownMenuPrimitive.Arrow, {
  fill: "white",
});

const Atag = styled("a", {
  all: "unset",
  width: "100%",
});

export const ProfileDropdown = () => {
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn(false);

  const { dispatch } = useContext(UserContext);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <UserIcon width={14} style={{ transform: "scale(1.6)", paddingTop: 1 }} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={10}>
        {isLoggedIn ? (
          <>
            <Link href={routes.settingsAccount} passHref>
              <Atag
                onClick={(e) => {
                  e.preventDefault();
                  pushUser(router, routes.settingsAccount, "dropDownMenu::onClick");
                }}
              >
                <DropdownMenuItem>
                  <CgProfile style={{ transform: "scale(1.4)" }} /> Account
                </DropdownMenuItem>
              </Atag>
            </Link>

            <DropdownMenuItem onClick={() => logout(router, dispatch, routes.home)}>
              <MdOutlineLogout style={{ transform: "scale(1.4)" }} /> Logout
            </DropdownMenuItem>
          </>
        ) : (
          <Link href={routes.settingsAccount} passHref>
            <Atag
              onClick={(e) => {
                e.preventDefault();
                pushUser(router, routes.login, "dropDownMenu::onClick");
              }}
            >
              <DropdownMenuItem>
                <LoginIcon /> Login
              </DropdownMenuItem>
            </Atag>
          </Link>
        )}

        <DropdownMenuArrow offset={18} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
