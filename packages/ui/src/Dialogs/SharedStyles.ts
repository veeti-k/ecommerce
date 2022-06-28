import { css, keyframes } from "../stitches.config";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const dialogShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(0.98)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

export const dialogContentStyles = css({
  background: "$gray2",
  borderRadius: 6,
  border: "1px solid $colors$gray6",
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",

  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "450px",
  maxHeight: "85vh",

  padding: "0.9rem",

  transition: "$default",

  zIndex: 4,

  overflow: "auto",

  "&:focus": { outline: "none" },

  "@motionOk": {
    animation: `${dialogShow} 250ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

export const dialogOverlayStyles = css({
  position: "fixed",
  zIndex: 3,
  inset: 0,

  background: "$blackA5",
  backdropFilter: "blur(4px)",

  transition: "$default",

  "@motionOk": {
    animation: `${overlayShow} 250ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
});
