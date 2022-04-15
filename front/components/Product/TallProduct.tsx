import { Button, ListItem, UnorderedList } from "@chakra-ui/react";
import { FC } from "react";
import { ShowCaseProduct } from "../../types/Product";
import { routes } from "../../utils/routes";
import { ProductCard } from "../Card";
import { FlexDiv } from "../Containers";
import { ShoppingCartIcon } from "../Icons";
import { Link } from "../Link";
import { PageTitle, Text } from "../Text";

type TallProductProps = {
  product: ShowCaseProduct;
};

export const TallProduct: FC<TallProductProps> = ({ product }) => (
  <ProductCard>
    <Link
      href={routes.productRoot(product.id)}
      style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
    ></Link>

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
