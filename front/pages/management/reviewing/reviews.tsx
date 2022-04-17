import { AnimatePresence } from "framer-motion";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { useEffect, useState } from "react";
import { AnimatedListItem } from "../../../components/Animate";
import { CardContent, InfoCard } from "../../../components/Card";
import { FlexDiv, MgmtSettingsPageScrollableContent } from "../../../components/Containers";
import { ApproveProductReviewDialog } from "../../../components/Dialogs/Reviewing/ApproveProductReviewDialog";
import { DeclineProductReviewDialog } from "../../../components/Dialogs/Reviewing/DeclineProductReviewDialog";
import { ReviewingPageLayout } from "../../../components/layouts/ReviewingPageLayout";
import { TitleContainer } from "../../../components/layouts/Styles";
import { TextLink } from "../../../components/Link";
import { Review } from "../../../components/Product/Review";
import { Heading } from "../../../components/Text";
import { ResolvedCategory } from "../../../types/Category";
import { NotApprovedProductReview } from "../../../types/ProductReview";
import { getCategories_STATIC_PROPS } from "../../../utils/getStaticProps";
import { GetNotApprovedProductReviewsRequest } from "../../../utils/Requests/ProductReview";
import { routes } from "../../../utils/routes";

export const Reviewing: NextPage<Result> = ({ categories }) => {
  const [reviews, setReviews] = useState<NotApprovedProductReview[]>([]);

  const getReviews = async () => {
    const res = await GetNotApprovedProductReviewsRequest();

    if (res) setReviews(res.data);
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <ReviewingPageLayout categories={categories}>
      <TitleContainer>
        <Heading>
          {reviews.length} review{reviews.length > 1 || reviews.length == 0 ? "s" : ""}
        </Heading>
      </TitleContainer>

      <MgmtSettingsPageScrollableContent>
        <CardContent>
          <FlexDiv column>
            <AnimatePresence>
              {reviews.map((review) => (
                <AnimatedListItem key={review.id} paddingBottom="1rem">
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
              ))}
            </AnimatePresence>
          </FlexDiv>
        </CardContent>
      </MgmtSettingsPageScrollableContent>
    </ReviewingPageLayout>
  );
};

type Result = {
  categories: ResolvedCategory[];
};

export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<Result>> => {
  const categories = await getCategories_STATIC_PROPS();

  return {
    props: {
      categories,
    },
  };
};

export default Reviewing;
