import * as Collapsible from "@radix-ui/react-collapsible";
import { motion } from "framer-motion";

import { styled } from "@ecommerce/ui";

export const CollapsibleMenuItemTrigger = styled(Collapsible.Trigger, {
  all: "unset",

  borderTopRightRadius: "0.2rem",
  borderBottomRightRadius: "0.2rem",

  transition: "$default",
  transitionProperty: "background, box-shadow",

  padding: "0 0.5rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  borderLeft: "1px solid $colors$gray6",

  "@hover": {
    "&:hover": {
      background: "$gray4",
    },
  },

  "&:active": {
    background: "$gray5",
  },

  "&:focus-visible": {
    outline: "none",
    boxShadow: `0 0 0 3px $colors$blue7`,
  },
});

export const CollapsibleMenuItem = styled(motion.a, {
  all: "unset",

  borderRadius: "0.2rem",
  padding: "0.8rem 0.5rem",

  transition: "$default",
  transitionProperty: "background, box-shadow",

  cursor: "pointer",

  display: "flex",
  alignItems: "center",

  "@hover": {
    "&:hover": {
      background: "$gray4",
    },
  },

  "&:active": {
    background: "$gray5",
  },

  "&:focus-visible": {
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
