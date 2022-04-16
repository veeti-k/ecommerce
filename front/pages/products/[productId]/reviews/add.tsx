import { Button, Input, Select, Textarea } from "@chakra-ui/react";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { useState } from "react";
import { Card } from "../../../../components/Card";
import {
  FlexDiv,
  InputLabelContainer,
  MgmtSettingsPageScrollableContent,
} from "../../../../components/Containers";
import { ArrowLeftIcon } from "../../../../components/Icons";
import { Layout } from "../../../../components/layouts/Layout";
import { PageTitleContainer } from "../../../../components/layouts/Styles";
import { Link, TextLink } from "../../../../components/Link";
import { Review } from "../../../../components/Product/Review";
import { Heading, PageTitle } from "../../../../components/Text";
import { ResolvedCategory } from "../../../../types/Category";
import { ProductPageProduct } from "../../../../types/Product";
import {
  getAllProducts_STATIC_PROPS,
  getCategories_STATIC_PROPS,
  getProduct_STATIC_PROPS,
} from "../../../../utils/getStaticProps";
import { routes } from "../../../../utils/routes";

const AddReview: NextPage<Result> = ({ categories, product }) => {
  const [nickname, setNickname] = useState<string>("");
  const [stars, setStars] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  return (
    <Layout categories={categories}>
      <PageTitleContainer>
        <PageTitle>Write a review</PageTitle>

        <Link href={routes.productRoot(product.id)}>
          <Button>
            <FlexDiv align gap05>
              <ArrowLeftIcon /> Back to product page
            </FlexDiv>
          </Button>
        </Link>
      </PageTitleContainer>

      <Card shadowFar padding0>
        <MgmtSettingsPageScrollableContent style={{ maxHeight: "calc(100vh - 11rem)" }}>
          <FlexDiv column fullWidth>
            <FlexDiv align spaceBetween fullWidth>
              <Heading style={{ paddingTop: "1rem" }}>
                Reviewing: <TextLink href={routes.productRoot(product.id)}>{product.name}</TextLink>
              </Heading>
            </FlexDiv>

            <FlexDiv align>
              <InputLabelContainer label="Nickname" id="nickname">
                <Input
                  id="nickname"
                  autoComplete="name"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  required
                />
              </InputLabelContainer>

              <InputLabelContainer label="Stars" id="stars">
                <Select
                  id="stars"
                  placeholder="Stars"
                  value={stars}
                  onChange={(e) => setStars(Number(e.target.value))}
                  required
                >
                  <option value={1}>1 star</option>
                  <option value={2}>2 stars</option>
                  <option value={3}>3 stars</option>
                  <option value={4}>4 stars</option>
                  <option value={5}>5 stars</option>
                </Select>
              </InputLabelContainer>
            </FlexDiv>

            <InputLabelContainer label="Title" id="title">
              <Input
                id="title"
                autoComplete="off"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </InputLabelContainer>

            <InputLabelContainer label="Review" id="review">
              <Textarea
                rows={10}
                id="review"
                autoComplete="off"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </InputLabelContainer>

            <FlexDiv column gap05>
              <Heading>Preview:</Heading>
              <Review
                review={{ stars, title, content, reviewersNickname: nickname, byEmployee: false }}
              />
            </FlexDiv>
          </FlexDiv>
        </MgmtSettingsPageScrollableContent>
      </Card>
    </Layout>
  );
};

type Result = {
  product: ProductPageProduct;
  categories: ResolvedCategory[];
};

export const getStaticProps: GetStaticProps = async (
  context
): Promise<GetStaticPropsResult<Result>> => {
  const id = context.params!.productId! as string;

  const product = await getProduct_STATIC_PROPS(id);
  const categories = await getCategories_STATIC_PROPS();

  return {
    props: {
      product,
      categories,
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

export default AddReview;
