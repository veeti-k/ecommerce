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
import { LogoutIcon } from "../../Icons";
import { PageTitle } from "../../Text";
import { Layout } from "../Layout";
import { PageTitleContainer, MainContent } from "../Styles";
import { SettingsMobileNav } from "./MobileNav";
import { SettingsNav } from "./Nav";

const Title = () => {
  const router = useRouter();
  const { dispatch } = useContext(UserContext);
  return (
    <FlexDiv spaceBetween align fullWidth>
      <PageTitle>Account settings</PageTitle>

      <Button
        colorScheme="red"
        style={{ boxShadow: "2px 4px 12px rgb(0 0 0 / 8%)" }}
        onClick={() => logout(router, dispatch, routes.home)}
        leftIcon={<LogoutIcon />}
      >
        Log out
      </Button>
    </FlexDiv>
  );
};

type SettingsPageLayoutProps = {
  categories: ResolvedCategory[];
};

export const SettingsPageLayout: FC<SettingsPageLayoutProps> = ({ children, categories }) => {
  const { state: bpState } = useContext(BreakpointContext);

  const hasMounted = useHasMounted();
  const viewBlocked = useIsLoggedIn();

  if (!hasMounted) return null;

  if (bpState.bp === "mobile")
    return (
      <Layout categories={categories} lessPaddingOnMobile>
        <PageTitleContainer test>
          <Title />

          <SettingsMobileNav />
        </PageTitleContainer>

        <MainContent>{viewBlocked ? null : children}</MainContent>
      </Layout>
    );

  return (
    <Layout categories={categories}>
      <>
        <PageTitleContainer>
          <Title />
        </PageTitleContainer>

        <Card shadowFar>
          <FlexDiv gap0>
            <SettingsNav />

            <MainContent>{viewBlocked ? null : children}</MainContent>
          </FlexDiv>
        </Card>
      </>
    </Layout>
  );
};
