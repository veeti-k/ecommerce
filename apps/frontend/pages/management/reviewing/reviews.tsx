import { AnimatePresence } from "framer-motion";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { useEffect, useState } from "react";
import { CardContent } from "../../../components/Card";
import { CardWrapper, FlexDiv } from "../../../components/Containers";
import { ReviewingPageLayout } from "../../../components/layouts/Reviewing/ReviewingPageLayout";
import { TitleContainer } from "../../../components/layouts/Styles";
import { ReviewingPageReview } from "../../../components/pages/management/reviewing/reviews/Review";
import { Pluralize } from "../../../components/Pluralize";
import { Heading } from "../../../components/Text";
import { ResolvedCategory } from "../../../types/Category";
import { ProductReviewWithProduct } from "../../../types/ProductReview";
import { STATIC_PROPS_REQUESTS } from "../../../utils/getStaticProps";
import { GetNotApprovedProductReviewsRequest } from "../../../utils/Requests/ProductReview";

export const Reviewing: NextPage<Result> = ({ resolvedCategories }) => {
  const [reviews, setReviews] = useState<ProductReviewWithProduct[]>([]);

  const getReviews = async () => {
    const res = await GetNotApprovedProductReviewsRequest();

    if (res) setReviews(res.data);
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <ReviewingPageLayout categories={resolvedCategories}>
      <TitleContainer>
        <Heading>
          <Pluralize count={reviews.length} singular="review" plural="reviews" />
        </Heading>
      </TitleContainer>

      {reviews.length ? (
        <CardWrapper scrollableMaxHeigth="calc(100vh - 13rem)">
          <CardContent>
            <FlexDiv column gap05>
              <AnimatePresence>
                {reviews.map((review) => (
                  <ReviewingPageReview
                    key={review.reviewId}
                    review={review}
                    getReviews={getReviews}
                  />
                ))}
              </AnimatePresence>
            </FlexDiv>
          </CardContent>
        </CardWrapper>
      ) : null}
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

export default Reviewing;
