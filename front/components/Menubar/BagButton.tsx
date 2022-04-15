import { IconButton, Tooltip } from "@chakra-ui/react";
import { routes } from "../../utils/routes";
import { ShoppingCartIcon } from "../Icons";
import { Link } from "../Link";

export const BagButton = () => {
  return (
    <Tooltip label="Shopping bag">
      <Link href={routes.home}>
        <IconButton aria-label="Shopping bag">
          <ShoppingCartIcon />
        </IconButton>
      </Link>
    </Tooltip>
  );
};
