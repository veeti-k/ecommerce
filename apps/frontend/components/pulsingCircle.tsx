import { keyframes } from "@stitches/react";
import { styled } from "../stitches.config";

const pulsingAnimation = keyframes({
  "0%": {
    transform: "scale(0.95)",
  },
  "70%": {
    transform: "scale(1)",
    boxShadow: "0 0 0 6px rgba(51, 217, 178, 0)",
  },
  "100%": {
    transform: "scale(0.95)",
    boxShadow: "0 0 0 0 rgba(51, 217, 178, 0)",
  },
});

export const PulsingCircle = styled("div", {
  width: 15,
  height: 15,
  background: "lightgreen",
  borderRadius: "50%",
  boxShadow: "0 0 0 0 rgba(51, 217, 178, 1)",
  animation: `${pulsingAnimation} 2.5s infinite`,
});
