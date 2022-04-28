import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useContext } from "react";
import { useHasMounted } from "../../hooks/useHasMounted";
import { ResolvedCategory } from "../../types/Category";
import { UserContext } from "../../UserProvider/provider";
import { logout } from "../../utils/logout";
import { pushUser } from "../../utils/router";
import { routes } from "../../utils/routes";
import { Card } from "../Card";
import { FlexDiv } from "../Containers";
import { AddressesIcon, LogoutIcon, PasswordIcon, SessionsIcon, UserIcon } from "../Icons";
import { Text, PageTitle } from "../Text";
import { Layout } from "./Layout";
import { PageTitleContainer, PageSelectorButtons, PageSelectorButton, MainContent } from "./Styles";

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

  const { dispatch, state } = useContext(UserContext);

  const hasMounted = useHasMounted();

  const isLoggedIn = state.userId && state.status === "loaded";

  if (!state.userId && state.status == "loaded")
    pushUser(router, "/", "settingsPageLayout::isLoggedIn false");

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
            >
              <FlexDiv gap05 align>
                <LogoutIcon /> Log out
              </FlexDiv>
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

            <MainContent>{hasMounted && isLoggedIn ? children : null}</MainContent>
          </FlexDiv>
        </Card>
      </>
    </Layout>
  );
};
