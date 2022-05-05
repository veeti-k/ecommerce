import { AnimatePresence } from "framer-motion";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { FC, ReactNode, useContext, useEffect, useState } from "react";
import { BreakpointContext } from "../../../BreakpointProvider/BreakpointProvider";
import { CardContent } from "../../../components/Card";
import { FlexDiv, MgmtSettingsPageScrollableContent } from "../../../components/Containers";
import { ReviewingPageLayout } from "../../../components/layouts/ReviewingPageLayout";
import { TitleContainer } from "../../../components/layouts/Styles";
import { ReviewingPageReview } from "../../../components/pages/management/reviewing/reviews/Review";
import { Pluralize } from "../../../components/Pluralize";
import { Heading } from "../../../components/Text";
import { ResolvedCategory } from "../../../types/Category";
import { ProductReviewWithProduct } from "../../../types/ProductReview";
import { STATIC_PROPS_REQUESTS } from "../../../utils/getStaticProps";
import { GetNotApprovedProductReviewsRequest } from "../../../utils/Requests/ProductReview";

const Content: FC<{ children: ReactNode }> = ({ children }) => {
  const { state } = useContext(BreakpointContext);

  if (state.bp === "mobile") return <>{children}</>;

  return <MgmtSettingsPageScrollableContent>{children}</MgmtSettingsPageScrollableContent>;
};

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
        <Content>
          <CardContent>
            <FlexDiv column gap05>
              <AnimatePresence>
                {reviews.map((review) => (
                  <ReviewingPageReview review={review} getReviews={getReviews} />
                ))}
              </AnimatePresence>
            </FlexDiv>
          </CardContent>
        </Content>
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
