import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import * as React from "react";

import { keyframes, styled } from "../stitches.config";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 0.9 },
});

const dialogShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -49%)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%)" },
});

const StyledOverlay = styled(AlertDialogPrimitive.Overlay, {
  backgroundColor: "$blackA10",
  position: "fixed",
  inset: 0,

  backdropFilter: "blur(2px)",
  opacity: 0.9,

  zIndex: 3,

  "@motionOk": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
});

const StyledContent = styled(AlertDialogPrimitive.Content, {
  backgroundColor: "$gray2",
  borderRadius: 6,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "450px",
  maxHeight: "85vh",
  padding: "0.9rem",
  width: "90vw",

  transition: "$background",

  zIndex: 4,

  "@motionOk": {
    animation: `${dialogShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
  "&:focus": { outline: "none" },
});

interface ContentProps {
  children: React.ReactNode;
}

function Content({ children, ...props }: ContentProps) {
  return (
    <AlertDialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent {...props}>{children}</StyledContent>
    </AlertDialogPrimitive.Portal>
  );
}

const StyledTitle = styled(AlertDialogPrimitive.Title, {
  margin: 0,
  fontWeight: "bold",
  color: "$hiContrast",
  fontSize: 18,
});

const StyledDescription = styled(AlertDialogPrimitive.Description, {
  margin: "10px 0 20px",
  color: "$hiContrast",
  fontSize: 15,
  lineHeight: 1.5,
});

export const AlertDialogRoot = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogContent = Content;
export const AlertDialogTitle = StyledTitle;
export const AlertDialogDescription = StyledDescription;
export const AlertDialogCancel = AlertDialogPrimitive.Cancel;
export const AlertDialogAction = AlertDialogPrimitive.Action;
