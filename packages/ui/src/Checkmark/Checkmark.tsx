import { keyframes, styled } from "../stitches.config";

const circleAnim = keyframes({
  from: {
    transform: "scale(0) rotate(45deg)",
    opacity: 0,
  },

  to: {
    transform: "scale(3) rotate(45deg)",
    opacity: 1,
  },
});

const CheckmarkAnim = keyframes({
  "0%": {
    height: 0,
    width: 0,
    opacity: 0,
  },

  "40%": {
    height: 0,
    width: "6px",
    opacity: 1,
  },

  "100%": {
    height: "10px",
    opacity: 1,
  },
});

export const Checkmark = styled("div", {
  width: "20px",
  height: "20px",
  borderRadius: "10px",

  opacity: 0,
  background: "$grass9",

  position: "relative",
  transform: "rotate(45deg)",

  "@motionOk": {
    animation: `${circleAnim} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards`,
    animationDelay: "100ms",
  },

  "&:after": {
    "@motionOk": {
      animation: `${CheckmarkAnim} 0.2s ease-out forwards`,
      animationDelay: "200ms",
    },

    opacity: 0,

    content: "''",
    boxSizing: "border-box",

    position: "absolute",
    left: "6px",
    bottom: "6px",

    borderBottom: "2px solid",
    borderRight: "2px solid",
    borderColor: "white",

    width: "6px",
    height: "10px",
  },
});
