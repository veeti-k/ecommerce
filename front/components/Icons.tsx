import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Edit, LogIn, Plus, Trash2, User } from "react-feather";
import { GiShoppingCart } from "react-icons/gi";

export const TrashIcon = () => <Trash2 width={14} transform="scale(1.3)" />;
export const EditIcon = () => <Edit width={14} transform="scale(1.3)" />;
export const HamburgerIcon = () => <HamburgerMenuIcon style={{ transform: "scale(1.3)" }} />;
export const ShoppingCartIcon = () => <GiShoppingCart transform="scale(1.9)" />;
export const UserIcon = User;
export const LoginIcon = LogIn;
export const PlusIcon = Plus;
