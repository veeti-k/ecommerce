import { Button } from "@chakra-ui/react";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { Card, CardContent } from "../../../../components/Card";
import { FlexDiv } from "../../../../components/Containers";
import { ArrowLeftIcon } from "../../../../components/Icons";
import { Layout } from "../../../../components/layouts/Layout";
import { PageTitleContainer } from "../../../../components/layouts/Styles";
import { Link, TextLink } from "../../../../components/Link";
import { Pluralize } from "../../../../components/Pluralize";
import { Review } from "../../../../components/Product/Review";
import { Stars } from "../../../../components/Product/Stars";
import { PageTitle, BiggerHeading, Heading } from "../../../../components/Text";
import { styled } from "../../../../stitches.config";
import { ResolvedCategory } from "../../../../types/Category";
import { ProductPageProduct } from "../../../../types/Product";
import { ProductReview } from "../../../../types/ProductReview";
import { NO_BUILD, STATIC_PROPS_REQUESTS } from "../../../../utils/getStaticProps";

import { routes } from "../../../../utils/routes";

const Div = styled(FlexDiv, {
  flexDirection: "column",

  "@mobileAndUp": {
    flexDirection: "row",
  },
});

const Reviews: NextPage<Result> = ({ resolvedCategories, product, reviews, valid }) => {
  if (!valid) return null;

  return (
    <Layout categories={resolvedCategories} lessPaddingOnMobile>
      <PageTitleContainer>
        <PageTitle>Reviews</PageTitle>

        <Link href={routes.productRoot(product.productId)}>
          <Button size="sm" leftIcon={<ArrowLeftIcon />}>
            Back to product page
          </Button>
        </Link>
      </PageTitleContainer>

      <Card shadowFar>
        <CardContent>
          <FlexDiv column>
            <Div spaceBetween>
              <FlexDiv>
                <TextLink href={routes.productRoot(product.productId)}>
                  <BiggerHeading>{product.name}</BiggerHeading>
                </TextLink>
              </FlexDiv>

              <FlexDiv align>
                <Stars
                  rating={product.averageStars}
                  size="lg"
                  showReviewsLabel
                  reviewCount={reviews.length}
                />

                <Heading>
                  {!!reviews.length ? (
                    <Pluralize singular="review" count={reviews.length} />
                  ) : (
                    "No reviews"
                  )}
                </Heading>
              </FlexDiv>
            </Div>

            <div>
              <Link href={routes.product.reviewsAdd(product.productId)}>
                <Button colorScheme="blue">
                  {!!reviews.length ? "Write a review" : "Write the first review"}
                </Button>
              </Link>
            </div>

            <Heading>
              {!!reviews.length ? (
                <Pluralize singular="review" count={reviews.length} />
              ) : (
                "No reviews"
              )}
            </Heading>

            {reviews.map((review) => (
              <Review review={review} key={review.reviewId} showCommentButton />
            ))}
          </FlexDiv>
        </CardContent>
      </Card>
    </Layout>
  );
};

type Result =
  | {
      product: ProductPageProduct;
      resolvedCategories: ResolvedCategory[];
      reviews: ProductReview[];
      valid: true;
    }
  | {
      product?: never;
      resolvedCategories?: never;
      reviews?: never;
      valid: false;
    };

export const getStaticProps: GetStaticProps = async (
  context
): Promise<GetStaticPropsResult<Result>> => {
  const productId = context.params!.productId! as string;

  if (productId === NO_BUILD) return { props: { valid: false } };

  const product = await STATIC_PROPS_REQUESTS.Products.getById(Number(productId));
  const resolvedCategories = await STATIC_PROPS_REQUESTS.Categories.getAllResolved();
  const reviews = await STATIC_PROPS_REQUESTS.Reviews.getApprovedByProductId(Number(productId));

  return {
    props: {
      product,
      resolvedCategories,
      reviews,
      valid: true,
    },
  };
};

export const getStaticPaths = async () => ({
  paths: [
    {
      params: {
        productId: NO_BUILD,
      },
    },
  ],
  fallback: "blocking",
});

export default Reviews;
