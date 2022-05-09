import { Button, ListItem, UnorderedList } from "@chakra-ui/react";
import Image from "next/image";
import { FC } from "react";
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

export const TallProduct: FC<TallProductProps> = ({ product }) => (
  <ProductCard>
    <Link
      href={routes.productRoot(product.productId)}
      style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
    ></Link>

    <FlexDiv style={{}} fullHeight align>
      <Image width={200} height={180} src={product.imageLinks.split(",")[0]} alt={product.name} />
    </FlexDiv>

    <FlexDiv column fullWidth fullHeight flexEnd gap05>
      <Text bold style={{ height: "2rem", lineHeight: "1rem", paddingTop: "0.2rem" }}>
        {product.name}
      </Text>

      <Stars rating={product.averageStars} />

      <UnorderedList style={{ height: "6rem", lineHeight: "1.2rem", paddingLeft: "0.25rem" }}>
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
