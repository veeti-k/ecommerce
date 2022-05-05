import { Heading } from "@chakra-ui/react";
import { FC } from "react";
import { ProductQuestionWithProduct } from "../../../../../types/ProductQuestion";
import { routes } from "../../../../../utils/routes";
import { AnimatedListItem } from "../../../../Animate";
import { InfoCard } from "../../../../Card";
import { FlexDiv } from "../../../../Containers";
import { ApproveProductQuestionDialog } from "../../../../Dialogs/Reviewing/ApproveProductQuestionDialog";
import { DeclineProductReviewDialog } from "../../../../Dialogs/Reviewing/DeclineProductReviewDialog";
import { TextLink } from "../../../../Link";
import { Question } from "../../../../Product/Question";

interface Props {
  question: ProductQuestionWithProduct;
  getQuestions: () => Promise<void>;
}

export const ReviewingPageQuestion: FC<Props> = ({ question, getQuestions }) => (
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
);
