import { Button, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, useContext } from "react";
import { Lock, LogOut, Shield, Truck } from "react-feather";
import { UserContext } from "../../UserProvider/provider";
import { styled } from "../../stitches.config";
import { logout } from "../../utils/logout";
import { pushUser } from "../../utils/router";
import { routes } from "../../utils/routes";
import { Card } from "../Card";
import { FlexDiv } from "../Containers";
import { UserIcon } from "../Icons";
import { BigHeading, Paragraph } from "../Text";

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

type Props = {
  activePage: string;
};

export const TitleAndLogout = () => {
  const router = useRouter();
  const { dispatch } = useContext(UserContext);

  return (
    <FlexDiv spaceBetween align style={{ paddingTop: "1rem" }}>
      <div>
        <BigHeading>Account settings</BigHeading>
        <Paragraph>Edit your account settings</Paragraph>
      </div>

      <Button
        colorScheme="red"
        style={{ boxShadow: "2px 4px 12px rgb(0 0 0 / 8%)" }}
        onClick={() => logout(router, dispatch, routes.home)}
      >
        <FlexDiv gap05 align>
          <LogOut /> Log out
        </FlexDiv>
      </Button>
    </FlexDiv>
  );
};

export const PageSelectorButtons = ({ activePage }: Props) => {
  const router = useRouter();

  const onClick = (e: MouseEvent, path: string) => {
    e.preventDefault();
    pushUser(router, path, "pageSelectorButton::onClick");
  };

  return (
    <PageSelectorButtonsContainer>
      <Link href={routes.settingsAccount}>
        <a onClick={(e) => onClick(e, routes.settingsAccount)}>
          <PageSelectorButton active={activePage == "account"}>
            <UserIcon size={20} /> <Text style={{ color: "black" }}>Account</Text>
          </PageSelectorButton>
        </a>
      </Link>

      <Link href={routes.settingsPassword}>
        <a onClick={(e) => onClick(e, routes.settingsPassword)}>
          <PageSelectorButton active={activePage == "password"}>
            <Lock size={20} /> <Text style={{ color: "black" }}>Password</Text>
          </PageSelectorButton>
        </a>
      </Link>
      <Link href={routes.settingsAddresses}>
        <a onClick={(e) => onClick(e, routes.settingsAddresses)}>
          <PageSelectorButton active={activePage == "addresses"}>
            <Truck size={20} /> <Text style={{ color: "black" }}>Addresses</Text>
          </PageSelectorButton>
        </a>
      </Link>
      <Link href={routes.settingsSessions}>
        <a onClick={(e) => onClick(e, routes.settingsSessions)}>
          <PageSelectorButton active={activePage == "sessions"}>
            <Shield size={20} /> <Text style={{ color: "black" }}>Sessions</Text>
          </PageSelectorButton>
        </a>
      </Link>
    </PageSelectorButtonsContainer>
  );
};
