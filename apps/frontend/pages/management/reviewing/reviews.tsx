import { AnimatePresence } from "framer-motion";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { useEffect, useState } from "react";
import { CardContent } from "../../../components/Card";
import { FlexDiv } from "../../../components/Containers";
import { ReviewingPageLayout } from "../../../components/layouts/ReviewingPageLayout/ReviewingPageLayout";
import { TitleContainer } from "../../../components/layouts/Styles";
import { ReviewingPageContent } from "../../../components/pages/management/reviewing/Content";
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
        <ReviewingPageContent>
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
        </ReviewingPageContent>
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
