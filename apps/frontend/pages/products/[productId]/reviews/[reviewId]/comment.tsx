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

import { routes } from "../../../../../utils/routes";
import { Formik } from "formik";
import { AddProductReviewCommentRequest } from "../../../../../utils/Requests/ProductReview";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { pushUser } from "../../../../../utils/router";
import { NO_BUILD, STATIC_PROPS_REQUESTS } from "../../../../../utils/getStaticProps";
import { validation } from "shared2";
import * as Yup from "yup";
import { useBlurCounter } from "../../../../../hooks/useBlurCounter";

const validationSchema = Yup.object().shape({
  commentersNickame: validation.nameSchema,
  title: Yup.string().required("Required"),
  content: Yup.string().required("Required"),
});

export const WriteReviewComment: NextPage<Result> = ({
  resolvedCategories,
  product,
  review,
  valid,
}) => {
  const router = useRouter();

  const { addBlurCount, blurCount } = useBlurCounter();

  if (!valid) return null;

  const onSubmit = async (values: AddProductReviewCommentRequestBody) => {
    const notifId = toast.loading("Adding comment");

    const res = await AddProductReviewCommentRequest(product.productId, review.reviewId, values);

    toast.dismiss(notifId);

    if (res) {
      toast("Your comment will show up after its approved", { icon: <InfoIcon /> });
      toast.success("Comment added");

      pushUser(
        router,
        routes.productRoot(product.productId),
        "product review comment added success"
      );
    }
  };

  return (
    <Layout categories={resolvedCategories}>
      <PageTitleContainer>
        <PageTitle>Write a comment</PageTitle>

        <Link href={routes.productRoot(product.productId)}>
          <Button size="sm" leftIcon={<ArrowLeftIcon />}>
            Back to product page
          </Button>
        </Link>
      </PageTitleContainer>

      <Card shadowFar>
        <CardContent>
          <FlexDiv column>
            <FlexDiv column>
              <TextLink href={routes.productRoot(product.productId)}>
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
                validationSchema={validationSchema}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  isValid,
                  touched,
                  errors,
                  isSubmitting,
                  values,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <FlexDiv column>
                      <InputLabelContainer
                        label="Nickname"
                        id="nickname"
                        error={
                          errors.commentersNickname && touched.commentersNickname
                            ? errors.commentersNickname
                            : undefined
                        }
                      >
                        <Input
                          id="nickname"
                          name="commentersNickname"
                          value={values.commentersNickname}
                          onChange={handleChange}
                          onBlur={(e) => {
                            addBlurCount();
                            if (blurCount !== 1) return;
                            handleBlur(e);
                          }}
                          isInvalid={!!errors.commentersNickname && touched.commentersNickname}
                          isRequired
                        />
                      </InputLabelContainer>

                      <InputLabelContainer
                        label="Title"
                        id="title"
                        error={errors.title && touched.title ? errors.title : undefined}
                      >
                        <Input
                          id="title"
                          name="title"
                          value={values.title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={!!errors.title && touched.title}
                          isRequired
                        />
                      </InputLabelContainer>

                      <InputLabelContainer
                        label="Content"
                        id="content"
                        error={errors.content && touched.content ? errors.content : undefined}
                      >
                        <Textarea
                          rows={10}
                          id="content"
                          name="content"
                          value={values.content}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={!!errors.content && touched.content}
                          isRequired
                        />
                      </InputLabelContainer>

                      <FlexDiv>
                        <Link
                          href={routes.productRoot(product.productId)}
                          style={{ width: "100%" }}
                        >
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

type Result =
  | {
      product: ProductPageProduct;
      review: ProductReview;
      resolvedCategories: ResolvedCategory[];
      valid: true;
    }
  | {
      product?: never;
      review?: never;
      resolvedCategories?: never;
      valid: false;
    };

export const getStaticProps: GetStaticProps = async (
  context
): Promise<GetStaticPropsResult<Result>> => {
  const productId = context.params!.productId! as string;
  const reviewId = context.params!.reviewId! as string;

  if (productId === NO_BUILD || reviewId === NO_BUILD) return { props: { valid: false } };

  const product = await STATIC_PROPS_REQUESTS.Products.getById(Number(productId));
  const reviews = await STATIC_PROPS_REQUESTS.Reviews.getApprovedByProductId(Number(productId));
  const resolvedCategories = await STATIC_PROPS_REQUESTS.Categories.getAllResolved();

  const review = reviews?.find((r) => r.reviewId === reviewId) || null;

  if (!review)
    return {
      notFound: true,
    };

  return {
    props: {
      product,
      review,
      resolvedCategories,
      valid: true,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          productId: NO_BUILD,
          reviewId: NO_BUILD,
        },
      },
    ],
    fallback: "blocking",
  };
};
