import { motion } from "framer-motion";
import { BsArrowLeft, BsArrowRight, BsBagCheck, BsGrid, BsPlusSquare } from "react-icons/bs";
import { BiLinkExternal, BiStoreAlt, BiTrash } from "react-icons/bi";
import { HiChevronDown, HiHome, HiOutlineMenu, HiPlus } from "react-icons/hi";
import { FiEdit, FiLock, FiLogIn, FiLogOut, FiShield, FiShoppingBag, FiUser } from "react-icons/fi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaRegAddressBook } from "react-icons/fa";

export const TrashIcon = () => <BiTrash size={20} transform="scale(1.1)" />;
export const EditIcon = () => <FiEdit size={17} transform="scale(1.05)" />;

export const HamburgerIcon = () => <HiOutlineMenu />;
export const ShoppingCartIcon = () => <FiShoppingBag size={18} />;
export const UserIcon = () => <FiUser size={20} />;

export const LoginIcon = () => <FiLogIn size={20} />;
export const LogoutIcon = () => <FiLogOut size={20} />;

export const PlusIcon = () => <HiPlus />;
export const PlusSquareIcon = () => <BsPlusSquare size={20} />;
export const ProductsIcon = () => <BsGrid size={20} />;
export const OrdersIcon = () => <BsBagCheck size={20} />;

export const AddressesIcon = () => <FaRegAddressBook size={20} />;
export const SessionsIcon = () => <FiShield size={20} />;
export const PasswordIcon = () => <FiLock size={20} />;

export const ExternalLinkIcon = () => <BiLinkExternal />;
export const HomeIcon = () => <HiHome size={20} />;
export const StoreIcon = () => <BiStoreAlt size={20} style={{ marginTop: 1 }} />;

export const ArrowLeftIcon = () => <BsArrowLeft size={20} />;
export const ArrowRightIcon = () => <BsArrowRight size={20} />;

export const DashboardIcon = () => <MdOutlineSpaceDashboard size={20} />;

export const Chevron = ({ open }: { open: boolean }) => {
  return open ? (
    <motion.div initial={{ rotate: 0 }} animate={{ rotate: 180 }}>
      <HiChevronDown />
    </motion.div>
  ) : (
    <motion.div initial={{ rotate: 180 }} animate={{ rotate: 0 }}>
      <HiChevronDown />
    </motion.div>
  );
};
