import Link from "next/link";
import { useRouter } from "next/router";
import { FC, MouseEvent } from "react";
import { styled } from "../../stitches.config";
import { pushUser } from "../../utils/router";
import { FlexDiv } from "../Containers";

export const PageTitleContainer: FC = ({ children }) => (
  <FlexDiv spaceBetween align style={{ paddingTop: "0.5rem", paddingBottom: "1.5rem" }}>
    {children}
  </FlexDiv>
);

export const PageSelectorButtons = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  padding: "1rem",
  backgroundColor: "white",
  borderTopLeftRadius: "8px",
  borderBottomLeftRadius: "8px",
});

const PageSelectorButtonContainer = styled("div", {
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  borderRadius: "4px",
  padding: "0.8rem",
  paddingRight: "5rem",
  paddingLeft: "1rem",
  fontWeight: "light",
  transition: "$buttonHover",

  "&:hover": {
    cursor: "pointer",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },

  variants: {
    active: {
      true: {
        color: "#1e67a5",
        fontWeight: "bold",
      },
    },
  },
});

type PageSelectorButtonProps = {
  active?: boolean;
  route: string;
};

export const PageSelectorButton: FC<PageSelectorButtonProps> = ({ children, active, route }) => {
  const router = useRouter();

  const onClick = (e: MouseEvent, path: string) => {
    e.preventDefault();
    pushUser(router, path, "pageSelectorButton::onClick");
  };

  return (
    <Link href={route}>
      <a onClick={(e) => onClick(e, route)}>
        <PageSelectorButtonContainer active={active}>{children}</PageSelectorButtonContainer>
      </a>
    </Link>
  );
};

export const MainContent = styled("div", {
  backgroundColor: "#fcfcfc",
  display: "flex",
  width: "100%",
  padding: "1.5rem 2rem",

  borderTopRightRadius: "8px",
  borderBottomRightRadius: "8px",

  flexDirection: "column",
});
