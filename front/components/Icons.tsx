import { ChevronDownIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Edit, Lock, LogIn, Plus, Shield, ShoppingBag, Trash2, Truck, User } from "react-feather";
import { motion } from "framer-motion";
import { BsBagCheck, BsGrid, BsPlusSquare } from "react-icons/bs";
import { BiLinkExternal } from "react-icons/bi";

export const TrashIcon = () => <Trash2 width={14} transform="scale(1.3)" />;
export const EditIcon = () => <Edit width={13} transform="scale(1.3)" />;
export const HamburgerIcon = () => <HamburgerMenuIcon style={{ transform: "scale(1.3)" }} />;
export const ShoppingCartIcon = () => <ShoppingBag width={14} transform="scale(1.4)" />;
export const UserIcon = User;
export const LoginIcon = LogIn;
export const PlusIcon = Plus;
export const PlusSquareIcon = () => <BsPlusSquare size={20} />;
export const ProductsIcon = () => <BsGrid size={20} />;
export const OrdersIcon = () => <BsBagCheck size={20} />;

export const AddressesIcon = () => <Truck size={20} />;
export const SessionsIcon = () => <Shield size={20} />;
export const PasswordIcon = () => <Lock size={20} />;

export const ExternalLinkIcon = () => <BiLinkExternal />;

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
