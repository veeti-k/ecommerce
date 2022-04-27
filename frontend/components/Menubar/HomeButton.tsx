import { IconButton, Tooltip } from "@chakra-ui/react";
import { routes } from "../../utils/routes";
import { HomeIcon } from "../Icons";
import { Link } from "../Link";

export const HomeButton = () => (
  <Link href={routes.home}>
    <Tooltip label="Go to homepage">
      <IconButton aria-label="Go to homepage">
        <HomeIcon />
      </IconButton>
    </Tooltip>
  </Link>
);
