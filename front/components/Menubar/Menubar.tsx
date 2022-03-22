import { FC } from "react";
import { styled } from "../../stitches.config";
import { Button } from "@chakra-ui/react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { GiShoppingCart } from "react-icons/gi";
import { ProfileDropdown } from "./ProfileDropdown";
import { Search } from "./Search";

const Header = styled("header", {
  position: "sticky",
  width: "100%",
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: "White",
});

const HeaderContent = styled("div", {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "1rem",
  height: "5rem",

  display: "flex",
  alignItems: "center",
  gap: "1rem",
});

export const Menubar: FC = () => {
  return (
    <Header>
      <HeaderContent>
        <Button>
          <HamburgerMenuIcon style={{ transform: "scale(1.3)" }} />
        </Button>
        <Search />
        <Button>
          <GiShoppingCart style={{ transform: "scale(1.7)" }} />
        </Button>
        <ProfileDropdown />
      </HeaderContent>
    </Header>
  );
};
