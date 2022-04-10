import { IconButton, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { pushUser } from "../../utils/router";
import { HomeIcon } from "../Icons";

export const HomeButton = () => {
  const router = useRouter();

  const onClick = () => pushUser(router, "/", "Menubar::home button");

  return (
    <Tooltip label="Go to homepage">
      <IconButton aria-label="Go to homepage" onClick={onClick}>
        <HomeIcon />
      </IconButton>
    </Tooltip>
  );
};
