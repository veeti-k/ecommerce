import { Button, Input, Textarea } from "@chakra-ui/react";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Card, CardContent } from "../../../../components/Card";
import { ArrowLeftIcon, InfoIcon } from "../../../../components/Icons";
import { Layout } from "../../../../components/layouts/Layout";
import { PageTitleContainer } from "../../../../components/layouts/Styles";
import { Link, TextLink } from "../../../../components/Link";
import { Heading, PageTitle } from "../../../../components/Text";
import { ResolvedCategory } from "../../../../types/Category";
import { ProductPageProduct } from "../../../../types/Product";
import { NO_BUILD, STATIC_PROPS_REQUESTS } from "../../../../utils/getStaticProps";
import { pushUser } from "../../../../utils/router";
import { routes } from "../../../../utils/routes";
import { Formik } from "formik";
import { AddProductQuestionRequestBody } from "../../../../types/ProductQuestion";
import { FlexDiv, InputLabelContainer } from "../../../../components/Containers";
import { AddProductQuestionRequest } from "../../../../utils/Requests/ProductQuestion";
import { validation } from "shared2";
import * as Yup from "yup";
import { useBlurCounter } from "../../../../hooks/useBlurCounter";

const validationSchema = Yup.object().shape({
  questionersNickame: validation.nameSchema,
  title: Yup.string().required("Required"),
  content: Yup.string().required("Required"),
});

const AskQuestion: NextPage<Result> = ({ product, resolvedCategories, valid }) => {
  const router = useRouter();

  if (!valid) return null;

  const onSubmit = async (values: AddProductQuestionRequestBody) =>
    toast.promise(
      (async () => {
        const res = await AddProductQuestionRequest(product.productId, values);

        if (res) {
          toast("Your question will show up after its approved", { icon: <InfoIcon /> });

          pushUser(router, routes.productRoot(product.productId), "question added success");
        }
      })(),
      {
        loading: "Adding question",
        success: "Question added",
        error: "Failed to add question",
      }
    );

  const { addBlurCount, blurCount } = useBlurCounter();

  return (
    <Layout categories={resolvedCategories}>
      <PageTitleContainer>
        <PageTitle>Ask a question</PageTitle>

        <Link href={routes.productRoot(product.productId)}>
          <Button size="sm" leftIcon={<ArrowLeftIcon />}>
            Back to product page
          </Button>
        </Link>
      </PageTitleContainer>

      <Card shadowFar>
        <CardContent>
          <FlexDiv column fullWidth>
            <Heading>
              Product:{" "}
              <TextLink href={routes.productRoot(product.productId)}>{product.name}</TextLink>
            </Heading>

            <Formik
              initialValues={{
                questionersNickname: "",
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
                        errors.questionersNickname && touched.questionersNickname
                          ? errors.questionersNickname
                          : undefined
                      }
                    >
                      <Input
                        id="nickname"
                        name="questionersNickname"
                        autoComplete="name"
                        value={values.questionersNickname}
                        onChange={handleChange}
                        isRequired
                        isInvalid={!!errors.questionersNickname && touched.questionersNickname}
                        onBlur={(e) => {
                          addBlurCount();
                          if (blurCount !== 1) return;
                          handleBlur(e);
                        }}
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
                        autoComplete="off"
                        value={values.title}
                        onChange={handleChange}
                        isRequired
                        isInvalid={!!errors.title && touched.title}
                        onBlur={handleBlur}
                      />
                    </InputLabelContainer>

                    <InputLabelContainer label="Question" id="question">
                      <Textarea
                        rows={10}
                        id="question"
                        name="content"
                        autoComplete="off"
                        value={values.content}
                        onChange={handleChange}
                        isRequired
                        isInvalid={!!errors.content && touched.content}
                        onBlur={handleBlur}
                      />
                    </InputLabelContainer>

                    <FlexDiv>
                      <Link href={routes.productRoot(product.productId)} style={{ width: "100%" }}>
                        <Button isFullWidth>Cancel</Button>
                      </Link>
                      <Button
                        isFullWidth
                        colorScheme="blue"
                        type="submit"
                        disabled={!isValid || isSubmitting}
                      >
                        Ask
                      </Button>
                    </FlexDiv>
                  </FlexDiv>
                </form>
              )}
            </Formik>
          </FlexDiv>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default AskQuestion;

type Result =
  | {
      product: ProductPageProduct;
      resolvedCategories: ResolvedCategory[];
      valid: true;
    }
  | {
      product?: never;
      resolvedCategories?: never;
      valid: false;
    };

export const getStaticProps: GetStaticProps = async (
  context
): Promise<GetStaticPropsResult<Result>> => {
  const productId = context.params!.productId! as string;

  if (productId === NO_BUILD) return { props: { valid: false } };

  const product = await STATIC_PROPS_REQUESTS.Products.getById(Number(productId));
  const resolvedCategories = await STATIC_PROPS_REQUESTS.Categories.getAllResolved();

  return {
    props: {
      product,
      resolvedCategories,
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
