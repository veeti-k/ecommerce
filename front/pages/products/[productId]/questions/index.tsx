import { Button } from "@chakra-ui/react";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { Card, CardContent } from "../../../../components/Card";
import { FlexDiv } from "../../../../components/Containers";
import { ArrowLeftIcon } from "../../../../components/Icons";
import { Layout } from "../../../../components/layouts/Layout";
import { PageTitleContainer } from "../../../../components/layouts/Styles";
import { Link, TextLink } from "../../../../components/Link";
import { Pluralize } from "../../../../components/Pluralize";
import { Question } from "../../../../components/Product/Question";
import { BiggerHeading, Heading, PageTitle } from "../../../../components/Text";
import { ResolvedCategory } from "../../../../types/Category";
import { ProductPageProduct } from "../../../../types/Product";
import { ProductQuestion } from "../../../../types/ProductQuestion";
import {
  getProduct_STATIC_PROPS,
  getCategories_STATIC_PROPS,
  getAllProducts_STATIC_PROPS,
  getQuestions_STATIC_PROPS,
} from "../../../../utils/getStaticProps";
import { routes } from "../../../../utils/routes";

const Questions: NextPage<Result> = ({ categories, product, questions }) => (
  <Layout categories={categories} lessPaddingOnMobile>
    <PageTitleContainer>
      <PageTitle>Questions</PageTitle>

      <Link href={routes.productRoot(product.id)}>
        <Button size="sm" leftIcon={<ArrowLeftIcon />}>
          Back to product page
        </Button>
      </Link>
    </PageTitleContainer>

    <Card shadowFar>
      <CardContent>
        <FlexDiv column>
          <FlexDiv>
            <TextLink href={routes.productRoot(product.id)}>
              <BiggerHeading>{product.name}</BiggerHeading>
            </TextLink>
          </FlexDiv>

          <div>
            <Link href={routes.product.questionsAdd(product.id)}>
              <Button colorScheme="blue">
                {!!questions.length ? "Ask a question" : "Ask the first question"}
              </Button>
            </Link>
          </div>

          <Heading>
            {!!questions.length ? (
              <Pluralize singular="question" count={questions.length} />
            ) : (
              "No questions"
            )}
          </Heading>

          <FlexDiv column gap05>
            {questions.map((question) => (
              <Question question={question} key={question.id} />
            ))}
          </FlexDiv>
        </FlexDiv>
      </CardContent>
    </Card>
  </Layout>
);

export default Questions;

type Result = {
  product: ProductPageProduct;
  categories: ResolvedCategory[];
  questions: ProductQuestion[];
};

export const getStaticProps: GetStaticProps = async (
  context
): Promise<GetStaticPropsResult<Result>> => {
  const id = context.params!.productId! as string;

  const product = await getProduct_STATIC_PROPS(id);
  const categories = await getCategories_STATIC_PROPS();
  const questions = await getQuestions_STATIC_PROPS(id);

  return {
    props: {
      product,
      categories,
      questions,
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
