import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { Card } from "../../components/Card";
import { Layout } from "../../components/layouts/Layout";
import { BigBigHeading, BigHeading, Heading, Paragraph, Text } from "../../components/Text";
import { styled } from "../../stitches.config";
import { Category, ProductPageProduct, ResolvedCategory } from "../../types";
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
  getAllCategories_STATIC_PROPS,
  getAllProducts_STATIC_PROPS,
  getCategories_STATIC_PROPS,
  getProduct_STATIC_PROPS,
} from "../../utils/getStaticProps";
import Markdown from "react-markdown";
import NextLink from "next/link";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { pushUser } from "../../utils/router";
import { useRouter } from "next/router";
import { ShoppingCartIcon } from "../../components/Icons";
import { DeleteProductDialog } from "../../components/Dialogs/Product/DeleteProductDialog";
import { isAdmin } from "../../utils/flagResolve";
import { useContext } from "react";
import { UserContext } from "../../UserProvider/provider";

const ProductPageCard = styled(Card, {
  display: "flex",
  flexDirection: "column",
  boxShadow: "$shadowFar",
  padding: "1.5rem",
  paddingTop: "1rem",
  height: "100%",
  marginBottom: "1rem",
});

const PriceCard = styled(Card, {
  boxShadow: "$shadowNearest",
  padding: "0.7rem",
  width: "100%",
});

const RightDiv = styled("div", {
  display: "flex",
  width: "400px",
});

const ImageContainer = styled("div", {
  display: "flex",
  height: "100%",
  width: "100%",

  "@tabletAndUp": {
    maxWidth: "800px",
  },
});

const MainDiv = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  height: "100%",
  alignItems: "center",

  "@tabletAndUp": {
    flexDirection: "row",
    alignItems: "flex-start",
  },
});

const ProductDescription = styled("div", {
  display: "flex",
  maxWidth: "800px",
  width: "100%",
  flexDirection: "column",
});

const ProductPage: NextPage<Result> = ({ product, categories, allCategories }) => {
  const router = useRouter();

  const { state } = useContext(UserContext);

  return (
    <Layout categories={categories} noPadding>
      <Breadcrumb style={{ padding: "0.3rem 0", paddingTop: "0.5rem" }}>
        <BreadcrumbItem>
          <BreadcrumbLink href={routes.home}>Home</BreadcrumbLink>
        </BreadcrumbItem>
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

        <FlexDiv align style={{ height: "calc(1rem + 5px)", marginTop: "0.3rem" }}>
          <Reviews product={product} />
          <Divider orientation="vertical" />
          <Questions product={product} />
        </FlexDiv>

        <MainDiv style={{ paddingTop: "2rem" }}>
          <ImageContainer>
            <img src={product.images[0].link} alt={product.name} />
          </ImageContainer>
          <RightDiv>
            <FlexDiv column fullWidth>
              <UnorderedList>
                {product.bulletPoints.map((bulletPoint) => (
                  <ListItem key={bulletPoint.id}>
                    <Text>{bulletPoint.text}</Text>
                  </ListItem>
                ))}
              </UnorderedList>

              <PriceCard>
                <FlexDiv column fullWidth>
                  <BigBigHeading>{product.price} €</BigBigHeading>
                  <Button colorScheme="blue">
                    <FlexDiv align gap05>
                      <ShoppingCartIcon /> Add to bag
                    </FlexDiv>
                  </Button>
                </FlexDiv>
              </PriceCard>
            </FlexDiv>
          </RightDiv>
        </MainDiv>

        <Divider style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }} />

        <MainDiv>
          <ProductDescription>
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
          </ProductDescription>

          <RightDiv style={{ height: "100%" }}>
            <PriceCard>
              <FlexDiv column fullWidth>
                <div>
                  <Text>Product id: </Text>
                  <Text bold>{product.id}</Text>
                </div>

                {isAdmin(state.flags) ? (
                  <FlexDiv column fullWidth gap05>
                    <Button
                      onClick={() =>
                        pushUser(
                          router,
                          `/products/edit/${product.id}`,
                          "Product page::Edit button"
                        )
                      }
                    >
                      Edit
                    </Button>
                    <DeleteProductDialog product={product} />
                  </FlexDiv>
                ) : null}
              </FlexDiv>
            </PriceCard>
          </RightDiv>
        </MainDiv>
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
  allCategories: Category[];
};

export const getStaticProps: GetStaticProps = async (
  context
): Promise<GetStaticPropsResult<Result>> => {
  const id = context.params!.id! as string;

  const product = await getProduct_STATIC_PROPS(id);
  const categories = await getCategories_STATIC_PROPS();
  const allCategories = await getAllCategories_STATIC_PROPS();

  return {
    props: {
      product,
      categories,
      allCategories,
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
