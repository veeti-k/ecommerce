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
import { NO_BUILD, STATIC_PROPS_REQUESTS } from "../../../../utils/getStaticProps";
import { routes } from "../../../../utils/routes";

const Questions: NextPage<Result> = ({ resolvedCategories, product, questions, valid }) => {
  if (!valid) return null;

  return (
    <Layout categories={resolvedCategories}>
      <PageTitleContainer>
        <PageTitle>Questions</PageTitle>

        <Link href={routes.productRoot(product.productId)}>
          <Button size="sm" leftIcon={<ArrowLeftIcon />}>
            Back to product page
          </Button>
        </Link>
      </PageTitleContainer>

      <Card shadowFar>
        <CardContent>
          <FlexDiv column>
            <FlexDiv>
              <TextLink href={routes.productRoot(product.productId)}>
                <BiggerHeading>{product.name}</BiggerHeading>
              </TextLink>
            </FlexDiv>

            <div>
              <Link href={routes.product.questionsAdd(product.productId)}>
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
                <Question question={question} key={question.questionId} />
              ))}
            </FlexDiv>
          </FlexDiv>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Questions;

type Result =
  | {
      product: ProductPageProduct;
      resolvedCategories: ResolvedCategory[];
      questions: ProductQuestion[];
      valid: true;
    }
  | {
      product?: never;
      resolvedCategories?: never;
      questions?: never;
      valid: false;
    };

export const getStaticProps: GetStaticProps = async (
  context
): Promise<GetStaticPropsResult<Result>> => {
  const productId = context.params!.productId! as string;

  if (productId === NO_BUILD) return { props: { valid: false } };

  const product = await STATIC_PROPS_REQUESTS.Products.getById(Number(productId));
  const resolvedCategories = await STATIC_PROPS_REQUESTS.Categories.getAllResolved();
  const questions = await STATIC_PROPS_REQUESTS.Questions.getApprovedByProductId(Number(productId));

  return {
    props: {
      product,
      resolvedCategories,
      questions,
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
