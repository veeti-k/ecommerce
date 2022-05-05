import { Heading } from "@chakra-ui/react";
import { FC } from "react";
import { ProductReviewWithProduct } from "../../../../../types/ProductReview";
import { routes } from "../../../../../utils/routes";
import { AnimatedListItem } from "../../../../Animate";
import { InfoCard } from "../../../../Card";
import { FlexDiv } from "../../../../Containers";
import { ApproveProductReviewDialog } from "../../../../Dialogs/Reviewing/ApproveProductReviewDialog";
import { DeclineProductReviewDialog } from "../../../../Dialogs/Reviewing/DeclineProductReviewDialog";
import { TextLink } from "../../../../Link";
import { Review } from "../../../../Product/Review";

interface Props {
  review: ProductReviewWithProduct;
  getReviews: () => Promise<void>;
}

export const ReviewingPageReview: FC<Props> = ({ review, getReviews }) => (
  <AnimatedListItem key={review.id}>
    <InfoCard>
      <FlexDiv column>
        <FlexDiv spaceBetween>
          <TextLink href={routes.productRoot(review.productId)}>
            <Heading>{review.product.name}</Heading>
          </TextLink>

          <FlexDiv gap05>
            <ApproveProductReviewDialog
              reviewId={review.id}
              productId={review.productId}
              getReviews={getReviews}
            />

            <DeclineProductReviewDialog
              reviewId={review.id}
              productId={review.productId}
              getReviews={getReviews}
            />
          </FlexDiv>
        </FlexDiv>
        <Review review={review} />
      </FlexDiv>
    </InfoCard>
  </AnimatedListItem>
);
