import { Button, ListItem, UnorderedList } from "@chakra-ui/react";
import { FC } from "react";
import { styled } from "../../stitches.config";
import { Product } from "../../types/Product";
import { routes } from "../../utils/routes";
import { Card, InfoCard } from "../Card";
import { FlexDiv } from "../Containers";
import { Link } from "../Link";
import { BiggerHeading, Heading, Text } from "../Text";
import { Stars } from "./Stars";

type Props = {
  product: Product;
};

const StyledImage = styled("img", {
  width: 150,
});

export const WideProduct: FC<Props> = ({ product }) => (
  <Card shadowNear hoverShadow style={{ height: "14rem" }}>
    <div style={{ width: "100%", height: "100%", position: "relative", padding: "1rem" }}>
      <Link
        href={routes.productRoot(product.productId)}
        style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
      ></Link>

      <FlexDiv fullWidth fullHeight>
        <FlexDiv fullHeight align>
          <StyledImage src={product.imageLinks.split(",")[0]} alt={product.name} />
        </FlexDiv>

        <FlexDiv column fullWidth fullHeight>
          <Heading>{product.name}</Heading>
          <FlexDiv fullHeight>
            <FlexDiv column style={{ width: "50%" }} spaceBetween>
              <Text style={{ lineHeight: "1.05rem" }}>
                {product.shortDescription.slice(0, 250)}
              </Text>

              <FlexDiv align>
                <BiggerHeading>{product.price} €</BiggerHeading>
                <FlexDiv>
                  <Stars rating={product.averageStars} />{" "}
                  {product.reviewCount ? `(${product.reviewCount})` : ""}
                </FlexDiv>
              </FlexDiv>
            </FlexDiv>

            <UnorderedList style={{ width: "50%" }}>
              {product.bulletPoints.split(",").map((bulletPoint, index) => (
                <ListItem key={index} style={{ lineHeight: "1rem" }}>
                  <Text bold>{bulletPoint}</Text>
                </ListItem>
              ))}
            </UnorderedList>

            <FlexDiv>
              <InfoCard>
                <Button>Add to cart</Button>
              </InfoCard>
            </FlexDiv>
          </FlexDiv>
        </FlexDiv>
      </FlexDiv>
    </div>
  </Card>
);
