import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { NextPage } from "next";
import { Card } from "../../components/Card";
import { Layout } from "../../components/layouts/Layout";
import { BigBigHeading, BigHeading, Paragraph } from "../../components/Text";
import { styled } from "../../stitches.config";
import { useState } from "react";
import { ProductPageProduct } from "../../types";
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
  padding: "1rem",
  width: "100%",
});

const MainGrid = styled("div", {
  display: "flex",
  gap: "1rem",
  height: "100%",
});

const ProductPage: NextPage = () => {
  const category1 = {
    id: 1,
    name: "Test category 1, root",
    parentId: null,
    children: [
      {
        id: 2,
        name: "Test category 2, child of category 1",
        parentId: 1,
        children: [
          {
            id: 3,
            name: "Test category 3, child of category 2",
            parentId: 2,
            children: [],
          },
        ],
      },
    ],
  };

  const category2 = {
    id: 2,
    name: "Test category 2, child of category 1",
    parentId: 1,
    children: [
      {
        id: 3,
        name: "Test category 3, child of category 2",
        parentId: 2,
        children: [],
      },
    ],
  };

  const category3 = {
    id: 3,
    name: "Test category 3, child of category 2",
    parentId: 2,
    children: [],
  };

  const product: ProductPageProduct = {
    path: [category1, category2, category3],
    bulletPoints: [],
    importantBulletpoints: [
      {
        id: 1,
        text: "This is a bulletpoint",
      },
      {
        id: 1,
        text: "This is a bulletpoint",
      },
      {
        id: 1,
        text: "This is a bulletpoint",
      },
    ],
    id: 1,
    name: "test-product",
    description: "very nice test product",
    price: 109,
    discountedPrice: 0,
    discountPercent: 0,
    discountAmount: 0,
    isDiscounted: false,
    isDeleted: false,
    averageStars: 0,
    reviewCount: 0,
    questionCount: 0,
  };

  return (
    <Layout>
      <Breadcrumb>
        {product.path.map((category) => (
          <BreadcrumbItem>
            <BreadcrumbLink href={routes.category(category.id)}>{category.name}</BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
      <ProductPageCard>
        <MainGrid>
          <AspectRatio.Root ratio={16 / 9}>
            <img
              style={{ width: "100%", maxWidth: "550px", height: "100%", objectFit: "contain" }}
              key={Math.random()}
              src={
                "https://cdn.verk.net/cdn-cgi/image/w=1632,h=1020,fit=scale-down,q=75,f=auto,sharpen=0.5/images/53/2_741736-2448x3544.jpeg"
              }
            />
          </AspectRatio.Root>

          <FlexDiv column fullWidth>
            <PriceCard>
              <FlexDiv spaceBetween align>
                <BigHeading>{product.name}</BigHeading>
                <Paragraph bold>ID: {product.id}</Paragraph>
              </FlexDiv>

              {product.importantBulletpoints.length ? (
                <UnorderedList>
                  {product.importantBulletpoints.map((bulletpoint) => (
                    <ListItem>{bulletpoint.text}</ListItem>
                  ))}
                </UnorderedList>
              ) : null}

              <BigBigHeading>{product.price} €</BigBigHeading>

              <Button colorScheme="blue" size="lg">
                Add to cart
              </Button>
            </PriceCard>
          </FlexDiv>
        </MainGrid>
      </ProductPageCard>
    </Layout>
  );
};

export default ProductPage;
