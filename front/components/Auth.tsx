import { styled } from "../stitches.config";

const StyledList = styled("div", {
  flexShrink: 0,
  display: "flex",
  borderBottom: `2px solid lightgray`,
});

const StyledTab = styled("div", {
  backgroundColor: "white",
  padding: "0 20px",
  height: 45,
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
  userSelect: "none",
  transition: "all 0.2s ease-in-out",
  "&:first-child": { borderTopLeftRadius: "0.5rem" },
  "&:last-child": { borderTopRightRadius: "0.5rem" },
  "&:hover": { backgroundColor: "#ededed", cursor: "pointer" },
  '&[data-state="active"]': {
    boxShadow: "inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor",
  },

  variants: {
    active: {
      true: {
        boxShadow: "0 4px 2px -2px gray",
        fontWeight: "bold",
      },
    },
  },
});

const StyledContent = styled("div", {
  flexGrow: 1,
  padding: "1rem",
  backgroundColor: "white",
  borderBottomLeftRadius: "0.5rem",
  borderBottomRightRadius: "0.5rem",
  outline: "none",
});

export const TabsList = StyledList;
export const Tab = StyledTab;
export const TabsContent = StyledContent;
