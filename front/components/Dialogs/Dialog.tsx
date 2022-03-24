import * as DialogPrimitive from "@radix-ui/react-dialog";
import { FC } from "react";
import { styled } from "../../stitches.config";
import { contentShow, overlayShow } from "./AlertDialog";

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  position: "fixed",
  inset: 0,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
  zIndex: 100,
});

export const StyledContent = styled(DialogPrimitive.Content, {
  position: "fixed",
  left: "50%",
  borderRadius: 8,
  boxShadow: "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  backgroundColor: "white",

  maxWidth: "400px",
  width: "100%",
  padding: "1rem",

  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },

  "&:focus": { outline: "none" },
  zIndex: 101,
});

const Content: FC = ({ children, ...props }) => {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent {...props}>{children}</StyledContent>
    </DialogPrimitive.Portal>
  );
};

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;
export const DialogContent = Content;
export const DialogClose = DialogPrimitive.Close;
