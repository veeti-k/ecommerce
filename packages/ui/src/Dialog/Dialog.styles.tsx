import * as DialogPrimitive from "@radix-ui/react-dialog";

import { keyframes, styled } from "../stitches.config";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const dialogShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%)" },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: "$blackA10",
  position: "fixed",
  inset: 0,
  backdropFilter: "blur(2px)",
  opacity: 0.9,

  transition: "$background",

  zIndex: 3,

  "@motionOk": {
    animation: `${overlayShow} 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
});

const StyledContent = styled(DialogPrimitive.Content, {
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

  overflow: "auto",

  "&:focus": { outline: "none" },

  "@motionOk": {
    animation: `${dialogShow} 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
});

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
