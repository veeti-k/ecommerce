import { keyframes } from "@stitches/react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Button } from "@chakra-ui/react";
import { styled } from "../../stitches.config";

import { MdOutlineLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { PersonIcon } from "@radix-ui/react-icons";

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

  "@media (prefers-reduced-motion: no-preference)": {
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
  },
});

const DropdownMenuItem = styled(DropdownMenuPrimitive.Item, {
  all: "unset",
  padding: "0.5rem",
  position: "relative",
  display: "flex",
  alignItems: "center",
  borderRadius: "0.2rem",

  "&:focus": {
    backgroundColor: "LightGray",
    border: "none",
    cursor: "pointer",
  },
});

const DropdownMenuArrow = styled(DropdownMenuPrimitive.Arrow, {
  fill: "white",
});

const Div = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});

export const ProfileDropdown = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button>
        <PersonIcon style={{ transform: "scale(1.3)" }} />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent sideOffset={10}>
      <DropdownMenuItem>
        <Div>
          <CgProfile style={{ transform: "scale(1.4)" }} /> Account
        </Div>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Div>
          <MdOutlineLogout style={{ transform: "scale(1.4)" }} /> Logout
        </Div>
      </DropdownMenuItem>
      <DropdownMenuArrow offset={18} />
    </DropdownMenuContent>
  </DropdownMenu>
);
