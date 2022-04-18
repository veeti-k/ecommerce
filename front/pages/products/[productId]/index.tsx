import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { Card, CardContent, InfoCard } from "../../../components/Card";
import { Layout } from "../../../components/layouts/Layout";
import { BiggerHeading, HugeHeading, Text } from "../../../components/Text";
import { styled } from "../../../stitches.config";
import { Button, Divider, ListItem, UnorderedList } from "@chakra-ui/react";
import { FlexDiv } from "../../../components/Containers";
import {
  getAllProducts_STATIC_PROPS,
  getCategories_STATIC_PROPS,
  getProduct_STATIC_PROPS,
} from "../../../utils/getStaticProps";
import { EditIcon, ShoppingCartIcon } from "../../../components/Icons";
import { DeleteProductDialog } from "../../../components/Dialogs/Product/DeleteProductDialog";
import { isAdmin } from "../../../utils/flagResolve";
import { useContext } from "react";
import { UserContext } from "../../../UserProvider/provider";
import { ResolvedCategory } from "../../../types/Category";
import { ProductPageProduct } from "../../../types/Product";
import { ProductPath } from "../../../components/Product/ProductPath";
import { Markdown } from "../../../components/Markdown";
import { Link } from "../../../components/Link";
import { routes } from "../../../utils/routes";
import { StarsReviewsQuestions } from "../../../components/Product/StarsReviewsQuestions";

const RightDiv = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "1rem",

  "@mobileAndUp": {
    flexDirection: "row",
  },

  "@tabletAndUp": {
    flexDirection: "column",
    maxWidth: "350px",
  },
});

const ImageContainer = styled("div", {
  display: "flex",
  height: "100%",
  width: "100%",
  justifyContent: "center",

  "@tabletAndUp": {
    maxWidth: "800px",
  },
});

const MainDiv = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  height: "100%",

  "@tabletAndUp": {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: "2rem",
  },
});

const ProductDescription = styled("div", {
  maxWidth: "800px",
  width: "100%",
});

type Props = {
  product: ProductPageProduct;
  categories: ResolvedCategory[];
};

const ProductPage: NextPage<Props> = ({ product, categories }) => {
  const { state } = useContext(UserContext);

  return (
    <Layout categories={categories} noPadding lessPaddingOnMobile>
      <ProductPath product={product} />

      <Card shadowFar>
        <CardContent>
          <FlexDiv fullWidth align spaceBetween style={{ paddingBottom: "0.5rem" }}>
            <BiggerHeading>{product.name}</BiggerHeading>
            <Text>{product.id}</Text>
          </FlexDiv>

          <StarsReviewsQuestions product={product} />

          <MainDiv style={{ paddingTop: "1rem" }}>
            <ImageContainer>
              <img src={product.images[0].link} alt={product.name} />
            </ImageContainer>
            <RightDiv>
              <FlexDiv fullWidth>
                <UnorderedList width={"100%"}>
                  {product.bulletPoints.map((bulletPoint) => (
                    <ListItem key={bulletPoint.id}>
                      <Text>{bulletPoint.text}</Text>
                    </ListItem>
                  ))}
                </UnorderedList>
              </FlexDiv>

              <InfoCard>
                <FlexDiv column>
                  <HugeHeading>{product.price} €</HugeHeading>
                  <Button colorScheme="blue" leftIcon={<ShoppingCartIcon />}>
                    Add to bag
                  </Button>
                </FlexDiv>
              </InfoCard>
            </RightDiv>
          </MainDiv>

          <Divider style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }} />

          <MainDiv>
            <ProductDescription>
              <Markdown>{product.description}</Markdown>
            </ProductDescription>

            <RightDiv style={{ height: "100%" }}>
              <InfoCard style={{ width: "100%" }}>
                <FlexDiv column fullWidth>
                  <div>
                    <Text>Product id: </Text>
                    <Text bold>{product.id}</Text>
                  </div>

                  {isAdmin(state.flags) ? (
                    <FlexDiv column gap05>
                      <Link href={routes.product.edit(product.id)}>
                        <Button isFullWidth leftIcon={<EditIcon />}>
                          Edit
                        </Button>
                      </Link>
                      <DeleteProductDialog product={product} />
                    </FlexDiv>
                  ) : null}
                </FlexDiv>
              </InfoCard>
            </RightDiv>
          </MainDiv>
        </CardContent>
      </Card>
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
