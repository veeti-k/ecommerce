import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { Card } from "../../components/Card";
import { Layout } from "../../components/layouts/Layout";
import { BigBigHeading, BigHeading, Heading, Paragraph, Text } from "../../components/Text";
import { styled } from "../../stitches.config";
import { ProductPageProduct, ResolvedCategory } from "../../types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Divider,
  Link,
  ListItem,
  Tooltip,
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
import Markdown from "react-markdown";
import NextLink from "next/link";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

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
  paddingTop: "2rem",
  alignItems: "center",

  "@tabletAndUp": {
    flexDirection: "row",
  },
});

const DescDiv = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  paddingTop: "0.5rem",
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
            <Text>{product.id}</Text>
          </FlexDiv>
        </FlexDiv>

        <FlexDiv align style={{ height: "calc(1rem + 5px)" }}>
          <Reviews product={product} />
          <Divider orientation="vertical" />
          <Questions product={product} />
        </FlexDiv>

        <MainDiv>
          <Image key={Math.random()} src={product.images[0].link} />
          <DescDiv>
            <UnorderedList>
              {product.bulletPoints.map((bulletPoint) => (
                <ListItem key={bulletPoint.id}>
                  <Text>{bulletPoint.text}</Text>
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

        <Divider style={{ marginTop: "1.5rem", marginBottom: "0.5rem" }} />

        <Markdown
          components={{
            h2: ({ node, ...props }) => <Heading {...props} />,
            ul: ({ node, ...props }) => <UnorderedList {...props} />,
            li: ({ node, ...props }) => (
              <ListItem {...props}>
                <Text>{props.children}</Text>
              </ListItem>
            ),
            p: ({ node, ...props }) => <Paragraph {...props} />,
            b: ({ node, ...props }) => <Paragraph bold {...props} />,
          }}
        >
          {product.description}
        </Markdown>
      </ProductPageCard>
    </Layout>
  );
};

const Reviews = ({ product }: { product: ProductPageProduct }) => {
  let fullStars = Math.floor(product.averageStars);

  if (product.averageStars - fullStars >= 0.78) fullStars++;

  const halfStars = product.averageStars - fullStars >= 0.28 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  const label = product.reviewCount
    ? `${product.averageStars}/5 based on ${product.reviewCount} reviews`
    : "No reviews yet";

  // prettier-ignore
  return (
    <FlexDiv align>
      <Tooltip label={label}>
        <FlexDiv gap0 style={{ gap: "0.3rem" }}>
          {[...Array(fullStars)].map((_, i) => (
            <BsStarFill key={i} />
          ))}
          {[...Array(halfStars)].map((_, i) => (
            <BsStarHalf key={i} />
          ))}
          {[...Array(emptyStars)].map((_, i) => (
            <BsStar key={i} />
          ))}
        </FlexDiv>
      </Tooltip>

      <NextLink href={`/products/${product.id}/reviews${!product.reviewCount ? "/add" : ""}`} passHref>
        <Link>
          <Text>
            {product.reviewCount 
              ? `Read ${product.reviewCount} reviews` 
              : "Write a review"}
          </Text>
        </Link>
      </NextLink>
    </FlexDiv>
  );
};

const Questions = ({ product }: { product: ProductPageProduct }) => {
  return (
    <NextLink
      href={`/products/${product.id}/questions${!product.questionCount ? "/add" : ""}`}
      passHref
    >
      <Link>
        <Text>
          {product.questionCount ? `${product.questionCount} questions` : "Ask the first question"}
        </Text>
      </Link>
    </NextLink>
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
