import * as RadixSeparator from "@radix-ui/react-separator";
import { styled } from "../stitches.config";

export const Separator = styled(RadixSeparator.Separator, {
  margin: "1rem 0",
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  "&[data-orientation=horizontal]": { height: 2, width: "100%" },
  "&[data-orientation=vertical]": { height: "100%", width: 2 },
});
