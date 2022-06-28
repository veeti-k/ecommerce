import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import * as React from "react";

import { styled } from "../../stitches.config";
import { dialogContentStyles, dialogOverlayStyles } from "../SharedStyles";

const StyledOverlay = styled(AlertDialogPrimitive.Overlay, dialogOverlayStyles);
const StyledContent = styled(AlertDialogPrimitive.Content, dialogContentStyles);

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
