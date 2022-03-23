import { keyframes } from "@stitches/react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { styled } from "../stitches.config";
import { FC } from "react";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const StyledOverlay = styled(AlertDialogPrimitive.Overlay, {
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  position: "fixed",
  inset: 0,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
});

const StyledContent = styled(AlertDialogPrimitive.Content, {
  position: "fixed",
  top: "50%",
  left: "50%",
  borderRadius: 8,
  boxShadow: "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  backgroundColor: "white",

  maxWidth: "500px",
  padding: "1rem",

  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",

  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },

  "&:focus": { outline: "none" },
});

const Content: FC = ({ children, ...props }) => {
  return (
    <AlertDialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent {...props}>{children}</StyledContent>
    </AlertDialogPrimitive.Portal>
  );
};

export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogContent = Content;
export const AlertDialogAction = AlertDialogPrimitive.Action;
export const AlertDialogCancel = AlertDialogPrimitive.Cancel;
