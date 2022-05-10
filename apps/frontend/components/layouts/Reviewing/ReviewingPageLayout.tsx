import { FC, ReactNode, useContext } from "react";
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
import { MainContent, PageTitleContainer } from "../Styles";
import { ReviewingMobileNav } from "./MobileNav";
import { ReviewingNav } from "./Nav";

type Props = {
  children: ReactNode;
  categories: ResolvedCategory[];
};

export const ReviewingPageLayout: FC<Props> = ({ children, categories }) => {
  const { state: bpState } = useContext(BreakpointContext);

  const loggedInViewBlocked = useIsLoggedIn();
  const { viewBlocked: flagsViewBlocked, layoutViewBlocked } = useFlagCheck(
    Flags.ManageQuestions,
    Flags.ManageReviews
  );
  const hasMounted = useHasMounted();

  const viewBlocked = loggedInViewBlocked || flagsViewBlocked;

  if (layoutViewBlocked || !hasMounted) return null;

  if (bpState.bp == "mobile")
    return (
      <Layout categories={categories}>
        <PageTitleContainer test>
          <PageTitle>Reviewing</PageTitle>

          <ReviewingMobileNav />
        </PageTitleContainer>

        <MainContent>{viewBlocked ? null : children}</MainContent>
      </Layout>
    );

  return (
    <Layout categories={categories}>
      <PageTitleContainer>
        <PageTitle>Reviewing</PageTitle>
      </PageTitleContainer>

      <Card shadowFar>
        <FlexDiv gap0>
          <ReviewingNav />

          <MainContent>{viewBlocked ? null : children}</MainContent>
        </FlexDiv>
      </Card>
    </Layout>
  );
};
