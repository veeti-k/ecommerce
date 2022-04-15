import { Tooltip, Link } from "@chakra-ui/react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { ProductPageProduct } from "../../types";
import { FlexDiv } from "../Containers";
import { Text } from "../Text";
import NextLink from "next/link";

export const ReviewsLink = ({ product }: { product: ProductPageProduct }) => {
  let fullStars = Math.floor(product.averageStars);

  if (product.averageStars - fullStars >= 0.78) fullStars++;

  const halfStars = product.averageStars - fullStars >= 0.28 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  const label = product.reviewCount
    ? `${product.averageStars}/5 based on ${product.reviewCount} reviews`
    : "No reviews yet";

  // prettier-ignore
  return (
    <FlexDiv align>
      <Tooltip label={label}>
        <FlexDiv gap0 style={{ gap: "0.3rem" }}>
          {[...Array(fullStars)].map((_, i) => (
            <BsStarFill key={i} />
          ))}
          {[...Array(halfStars)].map((_, i) => (
            <BsStarHalf key={i} />
          ))}
          {[...Array(emptyStars)].map((_, i) => (
            <BsStar key={i} />
          ))}
        </FlexDiv>
      </Tooltip>

      <NextLink href={`/products/${product.id}/reviews${!product.reviewCount ? "/add" : ""}`} passHref>
        <Link>
          <Text>
            {product.reviewCount 
              ? `Read ${product.reviewCount} reviews` 
              : "Write a review"}
          </Text>
        </Link>
      </NextLink>
    </FlexDiv>
  );
};
