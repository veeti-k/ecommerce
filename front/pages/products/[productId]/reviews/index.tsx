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
import {
  getProduct_STATIC_PROPS,
  getCategories_STATIC_PROPS,
  getAllProducts_STATIC_PROPS,
  getReviews_STATIC_PROPS,
} from "../../../../utils/getStaticProps";
import { routes } from "../../../../utils/routes";

const Div = styled(FlexDiv, {
  flexDirection: "column",

  "@mobileAndUp": {
    flexDirection: "row",
  },
});

const Reviews: NextPage<Result> = ({ categories, product, reviews }) => {
  if (!product || !categories || !reviews) return null;

  return (
    <Layout categories={categories} lessPaddingOnMobile>
      <PageTitleContainer>
        <PageTitle>Reviews</PageTitle>

        <Link href={routes.productRoot(product.id)}>
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
                <TextLink href={routes.productRoot(product.id)}>
                  <BiggerHeading>{product.name}</BiggerHeading>
                </TextLink>
              </FlexDiv>

              <FlexDiv align>
                <Stars
                  rating={product.averageStars}
                  bigger
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
              <Link href={routes.product.reviewsAdd(product.id)}>
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
              <Review review={review} key={review.id} showCommentButton />
            ))}
          </FlexDiv>
        </CardContent>
      </Card>
    </Layout>
  );
};

type Result = {
  product: ProductPageProduct | null;
  categories: ResolvedCategory[] | null;
  reviews: ProductReview[] | null;
};

export const getStaticProps: GetStaticProps = async (
  context
): Promise<GetStaticPropsResult<Result>> => {
  const productId = context.params!.productId! as string;

  const product = productId == "0" ? null : await getProduct_STATIC_PROPS(productId);
  const categories = productId == "0" ? null : await getCategories_STATIC_PROPS();
  const reviews = productId == "0" ? null : await getReviews_STATIC_PROPS(productId);

  return {
    props: {
      product,
      categories,
      reviews,
    },
  };
};

export const getStaticPaths = async () => {
  const products = await getAllProducts_STATIC_PROPS();

  return {
    paths: products.map((product) => {
      return {
        params: {
          productId: "0",
        },
      };
    }),
    fallback: "blocking",
  };
};

export default Reviews;
