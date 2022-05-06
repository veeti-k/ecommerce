import { AnimatePresence } from "framer-motion";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { useEffect, useState } from "react";
import { CardContent } from "../../../components/Card";
import { CardWrapper, FlexDiv } from "../../../components/Containers";
import { ReviewingPageLayout } from "../../../components/layouts/ReviewingPageLayout/ReviewingPageLayout";
import { TitleContainer } from "../../../components/layouts/Styles";
import { ReviewingPageQuestion } from "../../../components/pages/management/reviewing/questions/Question";
import { Pluralize } from "../../../components/Pluralize";
import { Heading } from "../../../components/Text";
import { ResolvedCategory } from "../../../types/Category";
import { ProductQuestionWithProduct } from "../../../types/ProductQuestion";
import { STATIC_PROPS_REQUESTS } from "../../../utils/getStaticProps";
import { GetNotApprovedProductQuestionsRequest } from "../../../utils/Requests/ProductQuestion";

export const ReviewingQuestions: NextPage<Result> = ({ resolvedCategories }) => {
  const [questions, setQuestions] = useState<ProductQuestionWithProduct[]>([]);

  const getQuestions = async () => {
    const res = await GetNotApprovedProductQuestionsRequest();

    if (res) setQuestions(res.data);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <ReviewingPageLayout categories={resolvedCategories}>
      <TitleContainer>
        <Heading>
          <Pluralize singular="question" count={questions.length} />
        </Heading>
      </TitleContainer>

      <CardWrapper scrollableMaxHeigth="calc(100vh - 13rem)">
        <CardContent>
          <FlexDiv column gap05>
            <AnimatePresence>
              {questions.map((question) => (
                <ReviewingPageQuestion
                  key={question.questionId}
                  question={question}
                  getQuestions={getQuestions}
                />
              ))}
            </AnimatePresence>
          </FlexDiv>
        </CardContent>
      </CardWrapper>
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
