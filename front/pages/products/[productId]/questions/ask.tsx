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

const AskQuestion: NextPage<Result> = ({ product, resolvedCategories, valid }) => {
  const router = useRouter();

  if (!valid) return null;

  const onSubmit = async (values: AddProductQuestionRequestBody) => {
    const notifId = toast.loading("Adding question");

    const res = await AddProductQuestionRequest(product.id, values);

    toast.dismiss(notifId);

    if (res) {
      toast("Your question will show up after its approved", { icon: <InfoIcon /> });
      toast.success("Question added");

      pushUser(router, routes.productRoot(product.id), "question added success");
    }
  };

  return (
    <Layout categories={resolvedCategories} lessPaddingOnMobile>
      <PageTitleContainer>
        <PageTitle>Ask a question</PageTitle>

        <Link href={routes.productRoot(product.id)}>
          <Button size="sm" leftIcon={<ArrowLeftIcon />}>
            Back to product page
          </Button>
        </Link>
      </PageTitleContainer>

      <Card shadowFar>
        <CardContent>
          <FlexDiv column fullWidth>
            <Heading>
              Product: <TextLink href={routes.productRoot(product.id)}>{product.name}</TextLink>
            </Heading>

            <Formik
              initialValues={{
                questionersNickname: "",
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
                        name="questionersNickname"
                        autoComplete="name"
                        value={values.questionersNickname}
                        onChange={handleChange}
                        required
                      />
                    </InputLabelContainer>

                    <InputLabelContainer label="Title" id="title">
                      <Input
                        id="title"
                        name="title"
                        autoComplete="off"
                        value={values.title}
                        onChange={handleChange}
                        required
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
                        required
                      />
                    </InputLabelContainer>

                    <FlexDiv>
                      <Link href={routes.productRoot(product.id)} style={{ width: "100%" }}>
                        <Button isFullWidth>Cancel</Button>
                      </Link>
                      <Button isFullWidth colorScheme="blue" type="submit">
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
