import { Button, Input, Textarea } from "@chakra-ui/react";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { Card, CardContent } from "../../../../../components/Card";
import { FlexDiv, InputLabelContainer } from "../../../../../components/Containers";
import { ArrowLeftIcon, InfoIcon } from "../../../../../components/Icons";
import { Layout } from "../../../../../components/layouts/Layout";
import { PageTitleContainer } from "../../../../../components/layouts/Styles";
import { Link, TextLink } from "../../../../../components/Link";
import { Review } from "../../../../../components/Product/Review";
import { PageTitle, BiggerHeading, Heading } from "../../../../../components/Text";
import { ResolvedCategory } from "../../../../../types/Category";
import { ProductPageProduct } from "../../../../../types/Product";
import {
  AddProductReviewCommentRequestBody,
  ProductReview,
} from "../../../../../types/ProductReview";
import {
  getProduct_STATIC_PROPS,
  getCategories_STATIC_PROPS,
  getReviews_STATIC_PROPS,
} from "../../../../../utils/getStaticProps";
import { routes } from "../../../../../utils/routes";
import { Formik } from "formik";
import { AddProductReviewCommentRequest } from "../../../../../utils/Requests/ProductReview";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { pushUser } from "../../../../../utils/router";

export const WriteReviewComment: NextPage<Result> = ({ categories, product, review }) => {
  const router = useRouter();

  if (!review || !product || !categories) return null;

  const onSubmit = async (values: AddProductReviewCommentRequestBody) => {
    const notifId = toast.loading("Adding comment");

    const res = await AddProductReviewCommentRequest(product.id, review.id, values);

    toast.dismiss(notifId);

    if (res) {
      toast("Your comment will show up after its approved", { icon: <InfoIcon /> });
      toast.success("Comment added");

      pushUser(router, routes.productRoot(product.id), "product review comment added success");
    }
  };

  return (
    <Layout categories={categories} lessPaddingOnMobile>
      <PageTitleContainer>
        <PageTitle>Write a comment</PageTitle>

        <Link href={routes.productRoot(product.id)}>
          <Button size="sm" leftIcon={<ArrowLeftIcon />}>
            Back to product page
          </Button>
        </Link>
      </PageTitleContainer>

      <Card shadowFar>
        <CardContent>
          <FlexDiv column>
            <FlexDiv column>
              <TextLink href={routes.productRoot(product.id)}>
                <BiggerHeading>{product.name}</BiggerHeading>
              </TextLink>

              <Heading>Commenting: </Heading>
              <Review review={review} />

              <Formik
                initialValues={{
                  commentersNickname: "",
                  title: "",
                  content: "",
                }}
                onSubmit={onSubmit}
              >
                {({ handleSubmit, values, handleChange }) => (
                  <form onSubmit={handleSubmit}>
                    <FlexDiv column>
                      <InputLabelContainer label="Nickname" id="nickname">
                        <Input
                          id="nickname"
                          name="nickname"
                          value={values.commentersNickname}
                          onChange={handleChange}
                        />
                      </InputLabelContainer>

                      <InputLabelContainer label="Title" id="title">
                        <Input
                          id="title"
                          name="title"
                          value={values.title}
                          onChange={handleChange}
                        />
                      </InputLabelContainer>

                      <InputLabelContainer label="Content" id="content">
                        <Textarea
                          rows={10}
                          id="content"
                          name="content"
                          value={values.content}
                          onChange={handleChange}
                        />
                      </InputLabelContainer>

                      <FlexDiv>
                        <Link href={routes.productRoot(product.id)} style={{ width: "100%" }}>
                          <Button isFullWidth>Cancel</Button>
                        </Link>
                        <Button isFullWidth colorScheme="blue" type="submit">
                          Submit
                        </Button>
                      </FlexDiv>
                    </FlexDiv>
                  </form>
                )}
              </Formik>
            </FlexDiv>
          </FlexDiv>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default WriteReviewComment;

type Result = {
  product: ProductPageProduct | null;
  review: ProductReview | null;
  categories: ResolvedCategory[] | null;
};

export const getStaticProps: GetStaticProps = async (
  context
): Promise<GetStaticPropsResult<Result>> => {
  const productId = context.params!.productId! as string;
  const reviewId = context.params!.reviewId! as string;

  const product = productId == "0" ? null : await getProduct_STATIC_PROPS(productId);
  const reviews = reviewId == "0" ? null : await getReviews_STATIC_PROPS(productId);
  const categories = productId == "0" ? null : await getCategories_STATIC_PROPS();

  const review = reviews?.find((r) => r.id === reviewId) || null;

  if (!review)
    return {
      notFound: true,
    };

  return {
    props: {
      product,
      review,
      categories,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          productId: "0",
          reviewId: "0",
        },
      },
    ],
    fallback: "blocking",
  };
};
