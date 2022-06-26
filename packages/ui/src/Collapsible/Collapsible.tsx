import * as Collapsible from "@radix-ui/react-collapsible";
import { motion } from "framer-motion";

import { styled } from "../stitches.config";

export const CollapsibleMenuItemTrigger = styled(Collapsible.Trigger, {
  all: "unset",
  transition: "$buttonHover",
  borderTopRightRadius: "0.2rem",
  borderBottomRightRadius: "0.2rem",

  borderLeft: "1px solid #eaeaea",

  "&:hover": {
    backgroundColor: "#ededed",
    border: "none",
  },

  "&:focus": {
    outline: "none",
    backgroundColor: "#ededed",
    border: "none",
  },
});

export const CollapsibleMenuItem = styled(motion.a, {
  all: "unset",
  transition: "$background",
  borderRadius: "0.2rem",
  cursor: "pointer",

  "@hover": {
    "&:hover": {
      backgroundColor: "$gray4",
      border: "none",
    },
  },

  "&:active": {
    backgroundColor: "$gray5",
    border: "none",
  },

  "&:focus-visible": {
    outline: "none",
    boxShadow: `0 0 0 3px $colors$blue7`,
  },

  variants: {
    aside: {
      true: {
        borderTopLeftRadius: "0.2rem",
        borderBottomLeftRadius: "0.2rem",
        borderTopRightRadius: "0",
        borderBottomRightRadius: "0",
        width: "100%",
      },
    },
  },
});

export const containerVariants = {
  initial: { opacity: 0, height: 0 },
  animate: {
    opacity: 1,
    height: "auto",
    transition: {
      staggerChildren: 0.007,
    },
  },
};

export const itemVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};
