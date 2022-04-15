import { IconButton, Tooltip } from "@chakra-ui/react";
import { routes } from "../../utils/routes";
import { HomeIcon } from "../Icons";
import { Link } from "../Link";

export const HomeButton = () => (
  <Tooltip label="Go to homepage">
    <Link href={routes.home}>
      <IconButton aria-label="Go to homepage">
        <HomeIcon />
      </IconButton>
    </Link>
  </Tooltip>
);
