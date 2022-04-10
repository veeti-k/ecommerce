import { IconButton, Tooltip } from "@chakra-ui/react";
import { ShoppingCartIcon } from "../Icons";

export const BagButton = () => {
  return (
    <Tooltip label="Shopping bag">
      <IconButton aria-label="Shopping bag">
        <ShoppingCartIcon />
      </IconButton>
    </Tooltip>
  );
};
