import { Button } from "@chakra-ui/react";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { Card, CardContent } from "../../../../components/Card";
import { FlexDiv, MgmtSettingsPageScrollableContent } from "../../../../components/Containers";
import { ArrowLeftIcon } from "../../../../components/Icons";
import { Layout } from "../../../../components/layouts/Layout";
import { PageTitleContainer } from "../../../../components/layouts/Styles";
import { Link, TextLink } from "../../../../components/Link";
import { Pluralize } from "../../../../components/Pluralize";
import { Review } from "../../../../components/Product/Review";
import { Stars } from "../../../../components/Product/Stars";
import { PageTitle, BiggerHeading, Heading } from "../../../../components/Text";
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

const Reviews: NextPage<Result> = ({ categories, product, reviews }) => {
  return (
    <Layout categories={categories}>
      <PageTitleContainer>
        <PageTitle>Reviews</PageTitle>

        <Link href={routes.productRoot(product.id)}>
          <Button leftIcon={<ArrowLeftIcon />}>Back to product page</Button>
        </Link>
      </PageTitleContainer>

      <Card shadowFar>
        <MgmtSettingsPageScrollableContent style={{ maxHeight: "calc(100vh - 11rem)" }}>
          <CardContent>
            <FlexDiv column gap05>
              <FlexDiv spaceBetween>
                <TextLink href={routes.productRoot(product.id)}>
                  <BiggerHeading>{product.name}</BiggerHeading>
                </TextLink>

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
              </FlexDiv>

              <div style={{ paddingBottom: "1rem" }}>
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
                <Review review={review} key={review.id} />
              ))}
            </FlexDiv>
          </CardContent>
        </MgmtSettingsPageScrollableContent>
      </Card>
    </Layout>
  );
};

type Result = {
  product: ProductPageProduct;
  categories: ResolvedCategory[];
  reviews: ProductReview[];
};

export const getStaticProps: GetStaticProps = async (
  context
): Promise<GetStaticPropsResult<Result>> => {
  const id = context.params!.productId! as string;

  const product = await getProduct_STATIC_PROPS(id);
  const categories = await getCategories_STATIC_PROPS();
  const reviews = await getReviews_STATIC_PROPS(id);

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
          productId: product.id.toString(),
        },
      };
    }),
    fallback: false,
  };
};

export default Reviews;
