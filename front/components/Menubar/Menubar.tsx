import { FC } from "react";
import { styled } from "../../stitches.config";
import { Button } from "@chakra-ui/react";
import { ProfileDropdown } from "./ProfileDropdown";
import { Search } from "./Search";
import { HamburgerIcon, ShoppingCartIcon } from "../Icons";

const Outer = styled("div", {
  position: "fixed",
  width: "100%",
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: "White",
  zIndex: 2,
});

const Header = styled("header", {
  boxSizing: "border-box",
});

const Inner = styled("div", {
  boxSizing: "border-box",
  flexShrink: 0,
  margin: "0 auto",
  padding: "0 25px",
  maxWidth: "1200px",
});

const HeaderContent = styled("div", {
  height: "5rem",
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});

export const Menubar: FC = () => {
  return (
    <Outer>
      <Header className="width-before-scroll-bar">
        <Inner>
          <HeaderContent>
            <Button>
              <HamburgerIcon />
            </Button>
            <Search />
            <Button>
              <ShoppingCartIcon />
            </Button>
            <ProfileDropdown />
          </HeaderContent>
        </Inner>
      </Header>
    </Outer>
  );
};
