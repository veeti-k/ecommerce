export const apiBase = process.env.NEXT_PUBLIC_API_BASE;
import { Toast } from "react-hot-toast";

// prettier-ignore
export const toastOptions: Partial<Pick<Toast, 
  "id" 
  | "icon" 
  | "duration" 
  | "ariaProps" 
  | "className" 
  | "style" 
  | "position" 
  | "iconTheme">> 
  | undefined = {
  duration: 4000,
};