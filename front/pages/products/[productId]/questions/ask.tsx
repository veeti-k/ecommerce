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
import {
  getProduct_STATIC_PROPS,
  getCategories_STATIC_PROPS,
} from "../../../../utils/getStaticProps";
import { pushUser } from "../../../../utils/router";
import { routes } from "../../../../utils/routes";
import { Formik } from "formik";
import { AddProductQuestionRequestBody } from "../../../../types/ProductQuestion";
import { FlexDiv, InputLabelContainer } from "../../../../components/Containers";
import { AddProductQuestionRequest } from "../../../../utils/Requests/ProductQuestion";

const AskQuestion: NextPage<Result> = ({ product, categories }) => {
  const router = useRouter();

  if (!product || !categories) return null;

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
    <Layout categories={categories} lessPaddingOnMobile>
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

type Result = {
  product: ProductPageProduct | null;
  categories: ResolvedCategory[] | null;
};

export const getStaticProps: GetStaticProps = async (
  context
): Promise<GetStaticPropsResult<Result>> => {
  const productId = context.params!.productId! as string;

  const product = productId == "0" ? null : await getProduct_STATIC_PROPS(productId);
  const categories = productId == "0" ? null : await getCategories_STATIC_PROPS();

  return {
    props: {
      product,
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
        },
      },
    ],
    fallback: "blocking",
  };
};
