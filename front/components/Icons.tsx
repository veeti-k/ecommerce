import { ChevronDownIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Edit, LogIn, Plus, Trash2, User } from "react-feather";
import { GiShoppingCart } from "react-icons/gi";
import { motion } from "framer-motion";

export const TrashIcon = () => <Trash2 width={14} transform="scale(1.3)" />;
export const EditIcon = () => <Edit width={14} transform="scale(1.3)" />;
export const HamburgerIcon = () => <HamburgerMenuIcon style={{ transform: "scale(1.3)" }} />;
export const ShoppingCartIcon = () => <GiShoppingCart transform="scale(1.9)" />;
export const UserIcon = User;
export const LoginIcon = LogIn;
export const PlusIcon = Plus;

export const Chevron = ({ open }: { open: boolean }) => {
  return open ? (
    <motion.div initial={{ rotate: 0 }} animate={{ rotate: 180 }}>
      <ChevronDownIcon transform="scale(1.2)" />
    </motion.div>
  ) : (
    <motion.div initial={{ rotate: 180 }} animate={{ rotate: 0 }}>
      <ChevronDownIcon transform="scale(1.2)" />
    </motion.div>
  );
};
