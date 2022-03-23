import { Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent } from "react";
import { Lock, Shield, Truck, User } from "react-feather";
import { styled } from "../../stitches.config";
import { pushUser } from "../../utils/router";
import { Card } from "../Card";

export const TempCard = styled(Card, {
  boxShadow: "2px 4px 12px rgb(0 0 0 / 8%)",
  display: "flex",
  flexDirection: "column",
  marginTop: "1rem",

  gap: "1rem",
});

export const MainGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "max-content 1fr",
});

export const Content = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: "1.5rem 2rem",
});

export const PageSelectorButtonsContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.8rem",
  borderRight: "1px solid #f5f5f7",
  padding: "1rem",
});

export const PageSelectorButton = styled("div", {
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  borderRadius: "4px",
  padding: "0.5rem",
  paddingRight: "5rem",
  paddingLeft: "1rem",
  fontWeight: "light",

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

export const TitleContainer = styled("div", {
  marginBottom: "1rem",
});

export const Grid = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1rem",

  variants: {
    col1: {
      true: {
        gridTemplateColumns: "1fr",
      },
    },
  },
});

export const InputLabelContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
});

type Props = {
  activePage: string;
};

export const PageSelectorButtons = ({ activePage }: Props) => {
  const router = useRouter();

  const onClick = (e: MouseEvent, path: string) => {
    e.preventDefault();
    pushUser(router, path, "pageSelectorButton::onClick");
  };

  return (
    <PageSelectorButtonsContainer>
      <Link href="/settings/account">
        <a onClick={(e) => onClick(e, "/settings/account")}>
          <PageSelectorButton active={activePage == "account"}>
            <User size={20} /> <Text style={{ color: "black" }}>Account</Text>
          </PageSelectorButton>
        </a>
      </Link>

      <Link href="/settings/password">
        <a onClick={(e) => onClick(e, "/settings/password")}>
          <PageSelectorButton active={activePage == "password"}>
            <Lock size={20} /> <Text style={{ color: "black" }}>Password</Text>
          </PageSelectorButton>
        </a>
      </Link>
      <Link href="/settings/addresses">
        <a onClick={(e) => onClick(e, "/settings/addresses")}>
          <PageSelectorButton active={activePage == "addresses"}>
            <Truck size={20} /> <Text style={{ color: "black" }}>Addresses</Text>
          </PageSelectorButton>
        </a>
      </Link>
      <Link href="/settings/sessions">
        <a onClick={(e) => onClick(e, "/settings/sessions")}>
          <PageSelectorButton active={activePage == "sessions"}>
            <Shield size={20} /> <Text style={{ color: "black" }}>Sessions</Text>
          </PageSelectorButton>
        </a>
      </Link>
    </PageSelectorButtonsContainer>
  );
};
