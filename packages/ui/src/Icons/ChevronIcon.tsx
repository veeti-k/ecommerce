import { motion } from "framer-motion";

import { ChevronDownIcon } from "./ChevronDownIcon";

export const ChevronIcon = ({ open }: { open: boolean }) => {
  return open ? (
    <motion.div initial={{ rotate: 0 }} animate={{ rotate: 180, y: -2 }}>
      <ChevronDownIcon />
    </motion.div>
  ) : (
    <motion.div initial={{ rotate: 180 }} animate={{ rotate: 0, y: 1 }}>
      <ChevronDownIcon />
    </motion.div>
  );
};
