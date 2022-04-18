import { AnimatePresence } from "framer-motion";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { BreakpointContext } from "../../../BreakpointProvider/BreakpointProvider";
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
import { ProductReviewWithProduct } from "../../../types/ProductReview";
import { getCategories_STATIC_PROPS } from "../../../utils/getStaticProps";
import { GetNotApprovedProductReviewsRequest } from "../../../utils/Requests/ProductReview";
import { routes } from "../../../utils/routes";

export const Reviewing: NextPage<Result> = ({ categories }) => {
  const [reviews, setReviews] = useState<ProductReviewWithProduct[]>([]);

  const { state } = useContext(BreakpointContext);

  const getReviews = async () => {
    const res = await GetNotApprovedProductReviewsRequest();

    if (res) setReviews(res.data);
  };

  useEffect(() => {
    getReviews();
  }, []);

  if (state.bp == "mobile")
    return (
      <ReviewingPageLayout categories={categories}>
        <TitleContainer>
          <Heading>
            {reviews.length} review{reviews.length > 1 || reviews.length == 0 ? "s" : ""}
          </Heading>
        </TitleContainer>

        <CardContent>
          <FlexDiv column gap05>
            <AnimatePresence>
              {reviews.map((review) => (
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
              ))}
            </AnimatePresence>
          </FlexDiv>
        </CardContent>
      </ReviewingPageLayout>
    );

  return (
    <ReviewingPageLayout categories={categories}>
      <TitleContainer>
        <Heading>
          {reviews.length} review{reviews.length > 1 || reviews.length == 0 ? "s" : ""}
        </Heading>
      </TitleContainer>

      <MgmtSettingsPageScrollableContent style={{ maxHeight: "calc(100vh - 13rem)" }}>
        <CardContent>
          <FlexDiv column gap05>
            <AnimatePresence>
              {reviews.map((review) => (
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
