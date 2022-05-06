import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useContext } from "react";
import { BreakpointContext } from "../../../BreakpointProvider/BreakpointProvider";
import { useHasMounted } from "../../../hooks/useHasMounted";
import { useIsLoggedIn } from "../../../hooks/useIsLoggedIn";
import { ResolvedCategory } from "../../../types/Category";
import { UserContext } from "../../../UserProvider/provider";
import { logout } from "../../../utils/logout";
import { routes } from "../../../utils/routes";
import { Card } from "../../Card";
import { FlexDiv } from "../../Containers";
import { AddressesIcon, LogoutIcon, PasswordIcon, SessionsIcon, UserIcon } from "../../Icons";
import { Text, PageTitle } from "../../Text";
import { Layout } from "../Layout";
import {
  PageTitleContainer,
  PageSelectorButtons,
  PageSelectorButton,
  MainContent,
} from "../Styles";
import { SettingsPageLayoutMobile } from "./SettingsPageLayoutMobile";

type ActivePage = "account" | "addresses" | "sessions" | "password";

type SettingsPageLayoutProps = {
  categories: ResolvedCategory[];
  activePage: ActivePage;
};

export const SettingsPageLayout: FC<SettingsPageLayoutProps> = ({
  children,
  categories,
  activePage,
}) => {
  const router = useRouter();

  const { dispatch } = useContext(UserContext);
  const { state: bpState } = useContext(BreakpointContext);

  const hasMounted = useHasMounted();
  const viewBlocked = useIsLoggedIn();

  if (!hasMounted) return null;

  if (bpState.bp === "mobile")
    return (
      <Layout categories={categories} lessPaddingOnMobile>
        <SettingsPageLayoutMobile />

        <MainContent>{viewBlocked ? null : children}</MainContent>
      </Layout>
    );

  return (
    <Layout categories={categories}>
      <>
        <PageTitleContainer>
          <FlexDiv spaceBetween align fullWidth>
            <div>
              <PageTitle>Account settings</PageTitle>
            </div>

            <Button
              colorScheme="red"
              style={{ boxShadow: "2px 4px 12px rgb(0 0 0 / 8%)" }}
              onClick={() => logout(router, dispatch, routes.home)}
              leftIcon={<LogoutIcon />}
            >
              Log out
            </Button>
          </FlexDiv>
        </PageTitleContainer>

        <Card shadowFar>
          <FlexDiv gap0>
            <PageSelectorButtons>
              <PageSelectorButton route={routes.settingsAccount} active={activePage === "account"}>
                <UserIcon /> <Text>Account</Text>
              </PageSelectorButton>
              <PageSelectorButton
                route={routes.settingsPassword}
                active={activePage === "password"}
              >
                <PasswordIcon /> <Text>Password</Text>
              </PageSelectorButton>
              <PageSelectorButton
                route={routes.settingsAddresses}
                active={activePage === "addresses"}
              >
                <AddressesIcon /> <Text>Addresses</Text>
              </PageSelectorButton>
              <PageSelectorButton
                route={routes.settingsSessions}
                active={activePage === "sessions"}
              >
                <SessionsIcon /> <Text>Sessions</Text>
              </PageSelectorButton>
            </PageSelectorButtons>

            <MainContent>{viewBlocked ? null : children}</MainContent>
          </FlexDiv>
        </Card>
      </>
    </Layout>
  );
};
