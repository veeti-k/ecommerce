import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { Card } from "../../../../components/Card";
import { FlexDiv } from "../../../../components/Containers";
import { Layout } from "../../../../components/layouts/Layout";
import { PageTitleContainer } from "../../../../components/layouts/Styles";
import { TextLink } from "../../../../components/Link";
import { Stars } from "../../../../components/Product/ReviewsLink";
import { PageTitle, BiggerHeading } from "../../../../components/Text";
import { ResolvedCategory } from "../../../../types/Category";
import { ProductPageProduct, ProductReview } from "../../../../types/Product";
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
      </PageTitleContainer>

      <Card shadowFar>
        <FlexDiv spaceBetween align>
          <TextLink href={routes.productRoot(product.id)}>
            <BiggerHeading>{product.name}</BiggerHeading>
          </TextLink>

          <Stars rating={product.averageStars} bigger />
        </FlexDiv>

        {reviews.map((review) => (
          <Card key={review.id}>
            <FlexDiv spaceBetween align></FlexDiv>
          </Card>
        ))}
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
