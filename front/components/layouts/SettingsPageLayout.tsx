import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useContext } from "react";
import { LogOut } from "react-feather";
import { useGetMe } from "../../hooks/useGetMe";
import { useIsLoggedIn } from "../../hooks/useIsLoggedIn";
import { UserContext } from "../../UserProvider/provider";
import { logout } from "../../utils/logout";
import { routes } from "../../utils/routes";
import { PageCard } from "../Card";
import { FlexDiv } from "../Containers";
import { AddressesIcon, PasswordIcon, SessionsIcon, UserIcon } from "../Icons";
import { BiggerParagraph, BigHeading, Paragraph } from "../Text";
import { Layout } from "./Layout";
import { PageTitleContainer, PageSelectorButtons, PageSelectorButton, MainContent } from "./Styles";

export const SettingsPageLayout: FC = ({ children }) => {
  const router = useRouter();

  const isLoggedIn = useIsLoggedIn();
  useGetMe();

  const { dispatch } = useContext(UserContext);

  if (typeof window == "undefined") return null;

  return (
    <Layout>
      {isLoggedIn ? (
        <>
          <PageTitleContainer>
            <FlexDiv spaceBetween align>
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
          </PageTitleContainer>

          <PageCard>
            <FlexDiv gap0>
              <PageSelectorButtons>
                <PageSelectorButton
                  route={routes.settingsAccount}
                  active={window.location.pathname.includes("account")}
                >
                  <UserIcon size={20} /> <BiggerParagraph>Account</BiggerParagraph>
                </PageSelectorButton>
                <PageSelectorButton
                  route={routes.settingsPassword}
                  active={window.location.pathname.includes("password")}
                >
                  <PasswordIcon /> <BiggerParagraph>Password</BiggerParagraph>
                </PageSelectorButton>
                <PageSelectorButton
                  route={routes.settingsAddresses}
                  active={window.location.pathname.includes("addresses")}
                >
                  <AddressesIcon /> <BiggerParagraph>Addresses</BiggerParagraph>
                </PageSelectorButton>
                <PageSelectorButton
                  route={routes.settingsSessions}
                  active={window.location.pathname.includes("sessions")}
                >
                  <SessionsIcon /> <BiggerParagraph>Sessions</BiggerParagraph>
                </PageSelectorButton>
              </PageSelectorButtons>

              <MainContent>{children}</MainContent>
            </FlexDiv>
          </PageCard>
        </>
      ) : null}
    </Layout>
  );
};
