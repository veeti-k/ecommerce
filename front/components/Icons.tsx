import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Edit, Trash2, User } from "react-feather";
import { GiShoppingCart } from "react-icons/gi";

export const TrashIcon = () => <Trash2 transform="scale(0.8)" />;
export const EditIcon = () => <Edit transform="scale(0.8)" />;
export const HamburgerIcon = () => <HamburgerMenuIcon style={{ transform: "scale(1.3)" }} />;
export const ShoppingCartIcon = () => <GiShoppingCart transform="scale(1.9)" />;
export const UserIcon = User;
