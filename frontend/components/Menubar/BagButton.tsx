import { IconButton, Tooltip } from "@chakra-ui/react";
import { routes } from "../../utils/routes";
import { ShoppingCartIcon } from "../Icons";
import { Link } from "../Link";

export const BagButton = () => {
  return (
    <Link href={routes.home}>
      <Tooltip label="Shopping bag">
        <IconButton aria-label="Shopping bag">
          <ShoppingCartIcon />
        </IconButton>
      </Tooltip>
    </Link>
  );
};
