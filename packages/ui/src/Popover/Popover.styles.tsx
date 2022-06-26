import * as PopoverPrimitive from "@radix-ui/react-popover";

import { openAnim } from "../_utils/animations";
import { styled } from "../stitches.config";

export const PopoverContent = styled(PopoverPrimitive.Content, {
  minWidth: 220,
  overflow: "hidden",
  backgroundColor: "$gray2",
  borderRadius: 8,
  border: "1px solid $gray6",
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
  padding: "0.5rem",
  fontSize: 14,

  ...openAnim,
});
