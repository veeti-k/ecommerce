import { FC } from "react";
import { styled } from "../../stitches.config";
import { Search } from "./Search";
import { CategoryMenu } from "./CategoryMenu";
import { HomeButton } from "./HomeButton";
import { BagButton } from "./BagButton";
import { ResolvedCategory } from "../../types/Category";
import { ProfileMenu } from "./ProfileMenu";

const Outer = styled("div", {
  position: "fixed",
  width: "100%",
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: "White",
  zIndex: 2,
});

const Inner = styled("div", {
  boxSizing: "border-box",
  flexShrink: 0,
  margin: "0 auto",
  padding: "0 1rem",
  maxWidth: "1200px",

  "@mobileAndUp": {
    padding: "0 25px",
  },
});

const HeaderContent = styled("div", {
  height: "3.5rem",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",

  "@mobileAndUp": {
    height: "5rem",
    gap: "1rem",
  },
});

type MenubarProps = {
  categories: ResolvedCategory[];
};

export const Menubar: FC<MenubarProps> = ({ categories }) => {
  return (
    <Outer>
      <Inner>
        <HeaderContent>
          <CategoryMenu categories={categories} />
          <HomeButton />
          <Search />
          <BagButton />
          <ProfileMenu />
        </HeaderContent>
      </Inner>
    </Outer>
  );
};
