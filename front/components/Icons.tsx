import { ChevronDownIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Lock, Shield, ShoppingBag, Trash2, Truck } from "react-feather";
import { motion } from "framer-motion";
import { BsArrowLeft, BsArrowRight, BsBagCheck, BsGrid, BsPlusSquare } from "react-icons/bs";
import { BiLinkExternal, BiStoreAlt } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { FiEdit, FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import { PlusIcon as RadixPlus } from "@radix-ui/react-icons";
import { MdOutlineSpaceDashboard } from "react-icons/md";

export const TrashIcon = () => <Trash2 width={14} transform="scale(1.3)" />;
export const EditIcon = () => <FiEdit size={17} style={{ marginLeft: 2 }} />;

export const HamburgerIcon = () => <HamburgerMenuIcon style={{ transform: "scale(1.02)" }} />;
export const ShoppingCartIcon = () => <ShoppingBag width={14} transform="scale(1.2)" />;
export const UserIcon = () => <FiUser size={20} />;

export const LoginIcon = () => <FiLogIn size={20} />;
export const LogoutIcon = () => <FiLogOut size={20} />;

export const PlusIcon = () => <RadixPlus />;
export const PlusSquareIcon = () => <BsPlusSquare size={20} />;
export const ProductsIcon = () => <BsGrid size={20} />;
export const OrdersIcon = () => <BsBagCheck size={20} />;

export const AddressesIcon = () => <Truck size={20} />;
export const SessionsIcon = () => <Shield size={20} />;
export const PasswordIcon = () => <Lock size={20} />;

export const ExternalLinkIcon = () => <BiLinkExternal />;
export const HomeIcon = () => <HiHome size={20} />;
export const StoreIcon = () => <BiStoreAlt size={20} style={{ marginTop: 1 }} />;

export const ArrowLeftIcon = () => <BsArrowLeft size={20} />;
export const ArrowRightIcon = () => <BsArrowRight size={20} />;

export const DashboardIcon = () => <MdOutlineSpaceDashboard size={20} />;

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
