import * as DialogPrimitive from "@radix-ui/react-dialog";

import { styled } from "../../stitches.config";
import { dialogContentStyles, dialogOverlayStyles } from "../SharedStyles";

const StyledOverlay = styled(DialogPrimitive.Overlay, dialogOverlayStyles);
const StyledContent = styled(DialogPrimitive.Content, dialogContentStyles);

interface ContentProps {
  children: React.ReactNode;
}

const Content = ({ children, ...props }: ContentProps) => {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent {...props}>{children}</StyledContent>
    </DialogPrimitive.Portal>
  );
};

export const DialogRoot = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogContent = Content;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;
