import { Button, IconButton, ListItem, UnorderedList } from "@chakra-ui/react";
import Image from "next/image";
import { FC } from "react";
import { styled } from "../../stitches.config";
import { Product } from "../../types/Product";
import { routes } from "../../utils/routes";
import { Card } from "../Card";
import { FlexDiv } from "../Containers";
import { ShoppingCartIcon } from "../Icons";
import { Link } from "../Link";
import { Paragraph, Text } from "../Text";
import { Stars } from "./Stars";
import { useBreakpoints } from "../../hooks/useBreakpoints";

const ShortDesc = styled(Paragraph, {
  maxHeight: "5rem",
  overflowY: "hidden",
  textOverflow: "ellipsis",
  padding: 0,
  boxSizing: "border-box",
  "-webkit-line-clamp": 5,
  "-webkit-box-orient": "vertical",
  display: "-webkit-box",
  maxWidth: "100%",

  "@tabletAndUp": {
    maxWidth: "50%",
  },
});

const ProductName = styled("h1", {
  overflow: "hidden",
  textOverflow: "ellipsis",
  padding: 0,
  boxSizing: "border-box",
  "-webkit-line-clamp": 2,
  "-webkit-box-orient": "vertical",
  display: "-webkit-box",
  maxWidth: "100%",
  height: "auto",
  fontSize: "0.875rem",

  "@mobileAndUp": {
    fontWeight: "bold",
  },

  "@tabletAndUp": {
    fontSize: "1rem",
  },
});

const ProductPrice = styled("h2", {
  fontWeight: "bold",
  fontSize: "1rem",
});

const AddToCart = () => {
  const { mobile } = useBreakpoints();

  return mobile ? (
    <FlexDiv flexEnd>
      <IconButton aria-label="Add to cart" icon={<ShoppingCartIcon />} />
    </FlexDiv>
  ) : (
    <Button isFullWidth leftIcon={<ShoppingCartIcon />}>
      Add to cart
    </Button>
  );
};

type Props = {
  product: Product;
};

export const WideProduct: FC<Props> = ({ product }) => {
  const { mobile, desktop } = useBreakpoints();

  return (
    <Card shadowNear hoverShadow>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          padding: mobile ? "0.5rem" : "1rem",
        }}
      >
        <Link
          href={routes.productRoot(product.productId)}
          style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
        ></Link>

        <FlexDiv>
          <FlexDiv align style={{ position: "relative" }}>
            <Image
              width={mobile ? 80 : 150}
              height={100}
              objectFit="contain"
              src={product.imageLinks.split(",")[0]}
              alt={product.name}
            />
          </FlexDiv>

          <FlexDiv fullWidth spaceBetween gap05={mobile}>
            <FlexDiv column spaceBetween gap05>
              <ProductName>{product.name}</ProductName>

              {!mobile ? (
                <FlexDiv>
                  {desktop ? <ShortDesc>{product.shortDescription}</ShortDesc> : null}

                  <UnorderedList style={{ width: desktop ? "50%" : "100%" }}>
                    {product.bulletPoints.split(",").map((bulletPoint, index) => (
                      <ListItem key={index} style={{ lineHeight: "1rem" }}>
                        <Text bold={desktop}>{bulletPoint}</Text>
                      </ListItem>
                    ))}
                  </UnorderedList>
                </FlexDiv>
              ) : null}

              <FlexDiv>
                <FlexDiv align>
                  <ProductPrice>620000</ProductPrice>
                  <Stars size={mobile ? "sm" : "md"} rating={product.averageStars} />
                  {product.reviewCount ? <Text>({product.reviewCount})</Text> : ""}
                </FlexDiv>
              </FlexDiv>
            </FlexDiv>

            <FlexDiv spaceBetween fullHeight fullWidth column style={{ width: mobile ? 40 : 200 }}>
              <FlexDiv flexEnd>
                <Text style={{ zIndex: 2 }}>{product.productId}</Text>
              </FlexDiv>

              <AddToCart />
            </FlexDiv>
          </FlexDiv>
        </FlexDiv>
      </div>
    </Card>
  );
};
