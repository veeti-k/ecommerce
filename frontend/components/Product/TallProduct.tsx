import { Button, ListItem, UnorderedList } from "@chakra-ui/react";
import { FC } from "react";
import { styled } from "../../stitches.config";
import { Product } from "../../types/Product";
import { routes } from "../../utils/routes";
import { ProductCard } from "../Card";
import { FlexDiv } from "../Containers";
import { ShoppingCartIcon } from "../Icons";
import { Link } from "../Link";
import { PageTitle, Text } from "../Text";
import { Stars } from "./Stars";

type TallProductProps = {
  product: Product;
};

const StyledImage = styled("img", {
  width: 200,
  maxHeight: "200px",

  "@mobileAndUp": {
    width: "100%",
  },
});

export const TallProduct: FC<TallProductProps> = ({ product }) => (
  <ProductCard>
    <Link
      href={routes.productRoot(product.id)}
      style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
    ></Link>

    <FlexDiv flexEnd fullWidth>
      <Text style={{ zIndex: 5 }}>{product.id}</Text>
    </FlexDiv>

    <FlexDiv style={{ padding: "0.5rem 0" }} fullHeight align>
      <StyledImage src={product.imageUrl} alt={product.name} />
    </FlexDiv>

    <FlexDiv column fullWidth fullHeight flexEnd gap05>
      <Text bold style={{ height: "2rem", lineHeight: "1rem" }}>
        {product.name}
      </Text>

      <Stars rating={product.averageStars} />

      <UnorderedList style={{ height: "6.8rem", lineHeight: "1.3rem" }}>
        {product.bulletPoints.split(",").map((bulletPoint, index) => (
          <ListItem key={index}>
            <Text>{bulletPoint}</Text>
          </ListItem>
        ))}
      </UnorderedList>

      <FlexDiv column gap05>
        <PageTitle>{product.price} €</PageTitle>

        <Button>
          <FlexDiv align gap05>
            <ShoppingCartIcon /> Add to bag
          </FlexDiv>
        </Button>
      </FlexDiv>
    </FlexDiv>
  </ProductCard>
);