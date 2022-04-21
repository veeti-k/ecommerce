import { usePresence, motion } from "framer-motion";
import { FC, ReactNode } from "react";

const variants = {
  initial: { opacity: 0, height: 0 },
  animate: {
    opacity: 1,
    height: "auto",
    transition: {
      staggerChildren: 0.007,
    },
  },
};

type Props = {
  children: ReactNode;
  paddingTop?: string;
  paddingBottom?: string;
};

export const AnimatedListItem: FC<Props> = ({ children, paddingTop, paddingBottom }) => {
  const [isPresent, safeToRemove] = usePresence();

  const props = {
    layout: true,
    initial: "initial",
    animate: isPresent ? "animate" : "initial",
    variants,
    onAnimationComplete: () => !isPresent && safeToRemove(),
  };

  return (
    <motion.div {...props}>
      {paddingTop && <div style={{ paddingTop }} />}
      {children}
      {paddingBottom && <div style={{ paddingBottom }} />}
    </motion.div>
  );
};
