import * as Collapsible from "@radix-ui/react-collapsible";
import { motion } from "framer-motion";
import { styled } from "../../stitches.config";

export const CollapsibleTrigger = styled(Collapsible.Trigger, {
  transition: "$buttonHover",
  borderTopRightRadius: "0.2rem",
  borderBottomRightRadius: "0.2rem",
  padding: "0.8rem 1rem",

  borderLeft: "1px solid #eaeaea",

  "&:hover": {
    backgroundColor: "#ededed",
    border: "none",
    cursor: "pointer",
  },

  "&:focus": {
    outline: "none",
    backgroundColor: "#ededed",
    border: "none",
    cursor: "pointer",
  },
});

export const MenuItem = styled(motion.a, {
  all: "unset",
  transition: "$buttonHover",
  borderRadius: "0.2rem",
  padding: "0.8rem 1rem",

  "&:hover": {
    backgroundColor: "#ededed",
    border: "none",
    cursor: "pointer",
  },

  "&:focus": {
    backgroundColor: "#ededed",
    border: "none",
    cursor: "pointer",
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
