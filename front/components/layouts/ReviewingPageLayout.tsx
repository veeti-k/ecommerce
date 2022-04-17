import { FC, ReactNode, useContext } from "react";
import { ResolvedCategory } from "../../types/Category";
import { UserContext } from "../../UserProvider/provider";
import { hasManageQuestions, hasManageReviews } from "../../utils/flagResolve";
import { routes } from "../../utils/routes";
import { Card } from "../Card";
import { FlexDiv } from "../Containers";
import { QuestionIcon, ReviewIcon } from "../Icons";
import { PageTitle, Text } from "../Text";
import { Layout } from "./Layout";
import { MainContent, PageSelectorButton, PageSelectorButtons, PageTitleContainer } from "./Styles";

type Props = {
  children: ReactNode;
  categories: ResolvedCategory[];
};

export const ReviewingPageLayout: FC<Props> = ({ children, categories }) => {
  const { state } = useContext(UserContext);

  const allowedToManageQuestions = hasManageQuestions(state.flags);
  const allowedToManageReviews = hasManageReviews(state.flags);

  const allowedToViewSite = allowedToManageQuestions || allowedToManageReviews;

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
