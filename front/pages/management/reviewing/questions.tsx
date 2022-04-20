import { AnimatePresence } from "framer-motion";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { BreakpointContext } from "../../../BreakpointProvider/BreakpointProvider";
import { AnimatedListItem } from "../../../components/Animate";
import { CardContent, InfoCard } from "../../../components/Card";
import { FlexDiv, MgmtSettingsPageScrollableContent } from "../../../components/Containers";
import { ApproveProductQuestionDialog } from "../../../components/Dialogs/Reviewing/ApproveProductQuestionDialog";
import { DeclineProductQuestionDialog } from "../../../components/Dialogs/Reviewing/DeclineProductQuestionDialog";
import { DeclineProductReviewDialog } from "../../../components/Dialogs/Reviewing/DeclineProductReviewDialog";
import { ReviewingPageLayout } from "../../../components/layouts/ReviewingPageLayout";
import { TitleContainer } from "../../../components/layouts/Styles";
import { TextLink } from "../../../components/Link";
import { Pluralize } from "../../../components/Pluralize";
import { Question } from "../../../components/Product/Question";
import { Heading } from "../../../components/Text";
import { ResolvedCategory } from "../../../types/Category";
import { ProductQuestionWithProduct } from "../../../types/ProductQuestion";
import { STATIC_PROPS_REQUESTS } from "../../../utils/getStaticProps";
import { GetNotApprovedProductQuestionsRequest } from "../../../utils/Requests/ProductQuestion";
import { routes } from "../../../utils/routes";

export const ReviewingQuestions: NextPage<Result> = ({ resolvedCategories }) => {
  const [questions, setQuestions] = useState<ProductQuestionWithProduct[]>([]);

  const { state } = useContext(BreakpointContext);

  const getQuestions = async () => {
    const res = await GetNotApprovedProductQuestionsRequest();

    if (res) setQuestions(res.data);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  if (state.bp == "mobile")
    return (
      <ReviewingPageLayout categories={resolvedCategories}>
        <TitleContainer>
          <Heading>
            <Pluralize singular="question" count={questions.length} />
          </Heading>
        </TitleContainer>

        <CardContent>
          <FlexDiv column gap05>
            <AnimatePresence>
              {questions.map((question) => (
                <AnimatedListItem key={question.id}>
                  <InfoCard>
                    <FlexDiv column>
                      <FlexDiv spaceBetween>
                        <TextLink href={routes.productRoot(question.productId)}>
                          <Heading>{question.product.name}</Heading>
                        </TextLink>

                        <FlexDiv gap05>
                          <ApproveProductQuestionDialog
                            questionId={question.id}
                            productId={question.productId}
                            getQuestions={getQuestions}
                          />

                          <DeclineProductReviewDialog
                            reviewId={question.id}
                            productId={question.productId}
                            getReviews={getQuestions}
                          />
                        </FlexDiv>
                      </FlexDiv>
                      <Question question={question} />
                    </FlexDiv>
                  </InfoCard>
                </AnimatedListItem>
              ))}
            </AnimatePresence>
          </FlexDiv>
        </CardContent>
      </ReviewingPageLayout>
    );

  return (
    <ReviewingPageLayout categories={resolvedCategories}>
      <TitleContainer>
        <Heading>
          <Pluralize singular="question" count={questions.length} />
        </Heading>
      </TitleContainer>

      <MgmtSettingsPageScrollableContent style={{ maxHeight: "calc(100vh - 13rem)" }}>
        <CardContent>
          <FlexDiv column gap05>
            <AnimatePresence>
              {questions.map((question) => (
                <AnimatedListItem key={question.id}>
                  <InfoCard>
                    <FlexDiv column>
                      <FlexDiv spaceBetween>
                        <TextLink href={routes.productRoot(question.productId)}>
                          <Heading>{question.product.name}</Heading>
                        </TextLink>

                        <FlexDiv gap05>
                          <ApproveProductQuestionDialog
                            questionId={question.id}
                            productId={question.productId}
                            getQuestions={getQuestions}
                          />

                          <DeclineProductQuestionDialog
                            questionId={question.id}
                            productId={question.productId}
                            getQuestions={getQuestions}
                          />
                        </FlexDiv>
                      </FlexDiv>
                      <Question question={question} />
                    </FlexDiv>
                  </InfoCard>
                </AnimatedListItem>
              ))}
            </AnimatePresence>
          </FlexDiv>
        </CardContent>
      </MgmtSettingsPageScrollableContent>
    </ReviewingPageLayout>
  );
};

type Result = {
  resolvedCategories: ResolvedCategory[];
};

export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<Result>> => {
  const resolvedCategories = await STATIC_PROPS_REQUESTS.Categories.getAllResolved();

  return {
    props: {
      resolvedCategories,
    },
  };
};

export default ReviewingQuestions;
