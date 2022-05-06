import { FC, ReactNode, useContext } from "react";
import { BreakpointContext } from "../../../BreakpointProvider/BreakpointProvider";
import { useFlagCheck } from "../../../hooks/useFlagCheck";
import { useHasMounted } from "../../../hooks/useHasMounted";
import { useIsLoggedIn } from "../../../hooks/useIsLoggedIn";
import { ResolvedCategory } from "../../../types/Category";
import { Flags } from "../../../utils/flagResolve";
import { routes } from "../../../utils/routes";
import { Card } from "../../Card";
import { FlexDiv } from "../../Containers";
import { QuestionIcon, ReviewIcon } from "../../Icons";
import { PageTitle, Text } from "../../Text";
import { Layout } from "../Layout";
import { ReviewingPageLayoutMobile } from "./ReviewingPageLayoutMobile";
import {
  MainContent,
  PageSelectorButton,
  PageSelectorButtons,
  PageTitleContainer,
} from "../Styles";

type Props = {
  children: ReactNode;
  categories: ResolvedCategory[];
};

export const ReviewingPageLayout: FC<Props> = ({ children, categories }) => {
  const { state: bpState } = useContext(BreakpointContext);

  const viewBlocked = useIsLoggedIn();
  const { viewBlocked: flagsViewBlocked, layoutViewBlocked } = useFlagCheck(
    Flags.ManageQuestions,
    Flags.ManageReviews
  );
  const hasMounted = useHasMounted();

  if (layoutViewBlocked && !hasMounted) return null;

  if (bpState.bp == "mobile")
    return (
      <Layout categories={categories} lessPaddingOnMobile>
        <ReviewingPageLayoutMobile />

        <MainContent>{viewBlocked || flagsViewBlocked ? null : children}</MainContent>
      </Layout>
    );

  return (
    <Layout categories={categories}>
      <PageTitleContainer>
        <PageTitle>Reviewing</PageTitle>
      </PageTitleContainer>

      <Card shadowFar>
        <FlexDiv gap0>
          <PageSelectorButtons>
            <PageSelectorButton
              route={routes.managementReviewingReviews}
              active={window.location.pathname.includes("reviews")}
            >
              <FlexDiv gap05>
                <ReviewIcon /> <Text>Reviews</Text>
              </FlexDiv>
            </PageSelectorButton>

            <PageSelectorButton
              route={routes.managementReviewingQuestions}
              active={window.location.pathname.includes("questions")}
            >
              <FlexDiv gap05>
                <QuestionIcon /> <Text>Questions</Text>
              </FlexDiv>
            </PageSelectorButton>
          </PageSelectorButtons>

          <MainContent>{viewBlocked || flagsViewBlocked ? null : children}</MainContent>
        </FlexDiv>
      </Card>
    </Layout>
  );
};
