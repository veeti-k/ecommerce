import { FC, useContext } from "react";
import { BreakpointContext } from "../../../BreakpointProvider/BreakpointProvider";
import { useFlagCheck } from "../../../hooks/useFlagCheck";
import { useHasMounted } from "../../../hooks/useHasMounted";
import { useIsLoggedIn } from "../../../hooks/useIsLoggedIn";
import { ResolvedCategory } from "../../../types/Category";
import { Flags } from "../../../utils/flagResolve";
import { Card } from "../../Card";
import { FlexDiv } from "../../Containers";
import { PageTitle } from "../../Text";
import { Layout } from "../Layout";
import { PageTitleContainer, MainContent } from "../Styles";
import { MgmtMobileNav } from "./MobileNav";
import { MgmtNav } from "./Nav";

type ManagementPageLayoutProps = {
  categories: ResolvedCategory[];
};

export const MgmtPageLayout: FC<ManagementPageLayoutProps> = ({ children, categories }) => {
  const { state: bpState } = useContext(BreakpointContext);

  const loggedInViewBlocked = useIsLoggedIn();
  const { viewBlocked: flagsViewBlocked, layoutViewBlocked } = useFlagCheck(
    Flags.ManageCategories,
    Flags.ManageProducts,
    Flags.ManageQuestions,
    Flags.ManageReviews,
    Flags.ManageUsers
  );

  const viewBlocked = loggedInViewBlocked || flagsViewBlocked;

  const hasMounted = useHasMounted();

  if (layoutViewBlocked || !hasMounted) return null;

  if (bpState.bp === "mobile")
    return (
      <Layout categories={categories} lessPaddingOnMobile>
        <PageTitleContainer test>
          <PageTitle>Management</PageTitle>

          <MgmtMobileNav />
        </PageTitleContainer>

        <MainContent>{!viewBlocked ? children : null}</MainContent>
      </Layout>
    );

  return (
    <Layout categories={categories}>
      <>
        <PageTitleContainer>
          <PageTitle>Management</PageTitle>
        </PageTitleContainer>

        <Card shadowFar>
          <FlexDiv gap0>
            <MgmtNav />

            <MainContent>{!viewBlocked ? children : null}</MainContent>
          </FlexDiv>
        </Card>
      </>
    </Layout>
  );
};
