import { Select } from "@chakra-ui/react";
import { FC, ReactNode, useContext } from "react";
import { BreakpointContext } from "../../BreakpointProvider/BreakpointProvider";
import { ResolvedCategory } from "../../types/Category";
import { UserContext } from "../../UserProvider/provider";
import { hasManageQuestions, hasManageReviews } from "../../utils/flagResolve";
import { routes } from "../../utils/routes";
import { Card } from "../Card";
import { FlexDiv } from "../Containers";
import { QuestionIcon, ReviewIcon } from "../Icons";
import { PageTitle, Text } from "../Text";
import { Layout } from "./Layout";
import { ReviewingPageLayoutMobile } from "./ReviewingPageLayout/ReviewingPageLayoutMobile";
import { MainContent, PageSelectorButton, PageSelectorButtons, PageTitleContainer } from "./Styles";

type Props = {
  children: ReactNode;
  categories: ResolvedCategory[];
};

export const ReviewingPageLayout: FC<Props> = ({ children, categories }) => {
  const { state: userState } = useContext(UserContext);
  const { state: bpState } = useContext(BreakpointContext);

  const allowedToManageQuestions = hasManageQuestions(userState.flags);
  const allowedToManageReviews = hasManageReviews(userState.flags);

  const allowedToViewSite = allowedToManageQuestions || allowedToManageReviews;

  if (bpState.bp == "mobile")
    return (
      <Layout categories={categories} lessPaddingOnMobile>
        <ReviewingPageLayoutMobile />

        <MainContent>{children}</MainContent>
      </Layout>
    );

  return (
    <Layout categories={categories}>
      {allowedToViewSite ? (
        <>
          <PageTitleContainer>
            <PageTitle>Reviewing</PageTitle>
          </PageTitleContainer>

          <Card shadowFar>
            <FlexDiv gap0>
              <PageSelectorButtons>
                {allowedToManageReviews && (
                  <PageSelectorButton
                    route={routes.managementReviewingReviews}
                    active={window.location.pathname.includes("reviews")}
                  >
                    <FlexDiv gap05>
                      <ReviewIcon /> <Text>Reviews</Text>
                    </FlexDiv>
                  </PageSelectorButton>
                )}

                {allowedToManageQuestions && (
                  <PageSelectorButton
                    route={routes.managementReviewingQuestions}
                    active={window.location.pathname.includes("questions")}
                  >
                    <FlexDiv gap05>
                      <QuestionIcon /> <Text>Questions</Text>
                    </FlexDiv>
                  </PageSelectorButton>
                )}
              </PageSelectorButtons>

              <MainContent>{children}</MainContent>
            </FlexDiv>
          </Card>
        </>
      ) : (
        <></>
      )}
    </Layout>
  );
};
