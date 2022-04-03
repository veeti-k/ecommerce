import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { Card } from "../../components/Card";
import { Layout } from "../../components/layouts/Layout";
import { BigBigHeading, BigHeading, Paragraph } from "../../components/Text";
import { styled } from "../../stitches.config";
import { ProductPageProduct, ResolvedCategory } from "../../types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { FlexDiv } from "../../components/Containers";
import { routes } from "../../utils/routes";
import {
  getAllProducts_STATIC_PROPS,
  getCategories_STATIC_PROPS,
  getProduct_STATIC_PROPS,
} from "../../utils/getStaticProps";
import { ShoppingCartIcon } from "../../components/Icons";

const ProductPageCard = styled(Card, {
  display: "flex",
  flexDirection: "column",
  boxShadow: "$shadowFar",
  padding: "1rem",
  height: "100%",
  margin: "1rem 0",
});

const PriceCard = styled(Card, {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  boxShadow: "$shadowNearest",
  padding: "0.7rem",
  width: "100%",
  maxWidth: "300px",

  "@tabletAndUp": {
    maxWidth: "100%",
  },
});

const Image = styled("img", {
  height: "100%",
  paddingRight: "1rem",

  "@tabletAndUp": {
    maxWidth: "700px",
  },
});

const MainDiv = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  height: "100%",
  paddingTop: "1rem",
  alignItems: "center",

  "@tabletAndUp": {
    flexDirection: "row",
  },
});

const DescDiv = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  paddingTop: "1rem",
  height: "100%",
  maxWidth: "400px",
  width: "100%",
  alignItems: "center",

  "@mobileAndUp": {
    alignItems: "normal",
    flexDirection: "row",
    maxWidth: "600px",
  },

  "@tabletAndUp": {
    flexDirection: "column",
  },
});

const ProductPage: NextPage<Result> = ({ product, categories }) => {
  return (
    <Layout categories={categories}>
      <Breadcrumb>
        {product.path?.length &&
          product.path.map((category) => (
            <BreadcrumbItem key={category.id}>
              <BreadcrumbLink href={routes.category(category.id)}>{category.name}</BreadcrumbLink>
            </BreadcrumbItem>
          ))}
      </Breadcrumb>
      <ProductPageCard>
        <FlexDiv column fullWidth align>
          <FlexDiv align spaceBetween fullWidth>
            <BigHeading>{product.name}</BigHeading>
            <Paragraph>{product.id}</Paragraph>
          </FlexDiv>
        </FlexDiv>

        <MainDiv>
          <Image key={Math.random()} src={product.images[0].link} />
          <DescDiv column fullWidth>
            <UnorderedList>
              {product.bulletPoints.map((bulletPoint) => (
                <ListItem key={bulletPoint.id}>
                  <Paragraph>{bulletPoint.text}</Paragraph>
                </ListItem>
              ))}
            </UnorderedList>

            <PriceCard>
              <BigBigHeading>{product.price} €</BigBigHeading>
              <Button colorScheme={"blue"}>
                <FlexDiv align gap05>
                  <ShoppingCartIcon /> Add to bag
                </FlexDiv>
              </Button>
            </PriceCard>
          </DescDiv>
        </MainDiv>
      </ProductPageCard>
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
  const id = context.params!.id! as string;

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
          id: product.id.toString(),
        },
      };
    }),
    fallback: false,
  };
};

export default ProductPage;
