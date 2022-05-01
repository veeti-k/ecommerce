import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { Card, CardContent, InfoCard } from "../../../components/Card";
import { Layout } from "../../../components/layouts/Layout";
import { BiggerHeading, HugeHeading, Text } from "../../../components/Text";
import { styled } from "../../../stitches.config";
import { Button, Divider, ListItem, UnorderedList } from "@chakra-ui/react";
import { FlexDiv } from "../../../components/Containers";
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
import { STATIC_PROPS_REQUESTS } from "../../../utils/getStaticProps";

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

const ProductPage: NextPage<Props> = ({ product, resolvedCategories, valid }) => {
  const { state } = useContext(UserContext);

  if (!valid) return null;

  return (
    <Layout categories={resolvedCategories} noPadding lessPaddingOnMobile>
      <ProductPath product={product} />

      <Card shadowFar>
        <CardContent>
          <FlexDiv fullWidth align spaceBetween style={{ paddingBottom: "0.5rem" }}>
            <BiggerHeading>{product.name}</BiggerHeading>
            <Text>{product.productId}</Text>
          </FlexDiv>

          <StarsReviewsQuestions product={product} />

          <MainDiv style={{ paddingTop: "1rem" }}>
            <ImageContainer>
              <img src={product.imageLinks.split(",")[0]} alt={product.name} />
            </ImageContainer>
            <RightDiv>
              <FlexDiv fullWidth>
                <UnorderedList width={"100%"}>
                  {product.bulletPoints.split(",").map((bulletPoint, i) => (
                    <ListItem key={i}>
                      <Text>{bulletPoint}</Text>
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
                    <Text bold>{product.productId}</Text>
                  </div>

                  {isAdmin(state.flags) ? (
                    <FlexDiv column gap05>
                      <Link href={routes.product.edit(product.productId)}>
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

type Props =
  | {
      product: ProductPageProduct;
      resolvedCategories: ResolvedCategory[];
      valid: true;
    }
  | {
      product?: never;
      resolvedCategories?: never[];
      valid: false;
    };

export const getStaticProps: GetStaticProps = async (
  context
): Promise<GetStaticPropsResult<Props>> => {
  const productId = context.params!.productId! as string;

  if (productId === "NO_BUILD") return { props: { valid: false } };

  const product = await STATIC_PROPS_REQUESTS.Products.getById(Number(productId));
  const resolvedCategories = await STATIC_PROPS_REQUESTS.Categories.getAllResolved();

  if ((product as any).message)
    return {
      notFound: true,
    };

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
        productId: "NO_BUILD",
      },
    },
  ],
  fallback: "blocking",
});

export default ProductPage;
