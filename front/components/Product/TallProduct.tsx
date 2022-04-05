import { Button, ListItem, UnorderedList } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";
import { styled } from "../../stitches.config";
import { ShowCaseProduct } from "../../types";
import { ProductCard } from "../Card";
import { FlexDiv } from "../Containers";
import { ShoppingCartIcon } from "../Icons";
import { BigHeading, Text } from "../Text";

type TallProductProps = {
  product: ShowCaseProduct;
};

const ATag = styled("a", {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
});

export const TallProduct: FC<TallProductProps> = ({ product }) => (
  <ProductCard>
    <Link href={`https://dev.veetik.fi/products/${product.id}`} passHref>
      <ATag></ATag>
    </Link>

    <FlexDiv flexEnd fullWidth>
      <Text style={{ zIndex: 5 }}>{product.id}</Text>
    </FlexDiv>

    <FlexDiv style={{ paddingTop: "1rem", paddingBottom: "1.5rem" }}>
      <img src={product.images[0]?.link} alt={product.name} />
    </FlexDiv>

    <FlexDiv column fullWidth fullHeight spaceBetween>
      <Text bold>{product.name}</Text>

      <UnorderedList>
        {product.bulletPoints.map((bulletPoint) => (
          <ListItem key={bulletPoint.id}>
            <Text>{bulletPoint.text}</Text>
          </ListItem>
        ))}
      </UnorderedList>

      <FlexDiv column gap05>
        <BigHeading>{product.price} €</BigHeading>

        <Button>
          <FlexDiv align gap05>
            <ShoppingCartIcon /> Add to bag
          </FlexDiv>
        </Button>
      </FlexDiv>
    </FlexDiv>
  </ProductCard>
);
