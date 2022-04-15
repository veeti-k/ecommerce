import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { Card, InfoCard } from "../../../components/Card";
import { Layout } from "../../../components/layouts/Layout";
import { BigBigHeading, BigHeading, Heading, Paragraph, Text } from "../../../components/Text";
import { styled } from "../../../stitches.config";
import { Button, Divider, ListItem, UnorderedList } from "@chakra-ui/react";
import { FlexDiv } from "../../../components/Containers";
import {
  getAllProducts_STATIC_PROPS,
  getCategories_STATIC_PROPS,
  getProduct_STATIC_PROPS,
} from "../../../utils/getStaticProps";
import Markdown from "react-markdown";
import { pushUser } from "../../../utils/router";
import { useRouter } from "next/router";
import { ShoppingCartIcon } from "../../../components/Icons";
import { DeleteProductDialog } from "../../../components/Dialogs/Product/DeleteProductDialog";
import { isAdmin } from "../../../utils/flagResolve";
import { useContext } from "react";
import { UserContext } from "../../../UserProvider/provider";
import { ReviewsLink } from "../../../components/Product/ReviewsLink";
import { QuestionsLink } from "../../../components/Product/QuestionsLink";
import { ResolvedCategory } from "../../../types/Category";
import { ProductPageProduct } from "../../../types/Product";
import { ProductPath } from "../../../components/Product/ProductPath";

const ProductPageCard = styled(Card, {
  display: "flex",
  flexDirection: "column",
  boxShadow: "$shadowFar",
  padding: "1.5rem",
  paddingTop: "1rem",
  height: "100%",
  marginBottom: "1rem",
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

type Props = {
  product: ProductPageProduct;
  categories: ResolvedCategory[];
};

const ProductPage: NextPage<Props> = ({ product, categories }) => {
  const router = useRouter();

  const { state } = useContext(UserContext);

  return (
    <Layout categories={categories} noPadding>
      <ProductPath product={product} />

      <ProductPageCard>
        <FlexDiv column fullWidth align>
          <FlexDiv align spaceBetween fullWidth>
            <BigHeading>{product.name}</BigHeading>
            <Text>{product.id}</Text>
          </FlexDiv>
        </FlexDiv>

        <FlexDiv align style={{ height: "calc(1rem + 5px)", marginTop: "0.3rem" }}>
          <ReviewsLink product={product} />
          <Divider orientation="vertical" />
          <QuestionsLink product={product} />
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

              <InfoCard>
                <FlexDiv column fullWidth>
                  <BigBigHeading>{product.price} €</BigBigHeading>
                  <Button colorScheme="blue">
                    <FlexDiv align gap05>
                      <ShoppingCartIcon /> Add to bag
                    </FlexDiv>
                  </Button>
                </FlexDiv>
              </InfoCard>
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
            <InfoCard>
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
            </InfoCard>
          </RightDiv>
        </MainDiv>
      </ProductPageCard>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (
  context
): Promise<GetStaticPropsResult<Props>> => {
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

export default ProductPage;
