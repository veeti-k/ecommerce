import { Tooltip } from "@chakra-ui/react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { FlexDiv } from "../Containers";
import { Text } from "../Text";
import { ProductPageProduct } from "../../types/Product";
import { TextLink } from "../Link";

export const Stars = ({ rating, bigger }: { rating: number; bigger?: boolean }) => {
  let fullStars = Math.floor(rating);

  if (rating - fullStars >= 0.78) fullStars++;

  const halfStars = rating - fullStars >= 0.28 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  const starSize = bigger ? 30 : 0;

  return (
    <FlexDiv gap0 style={{ gap: "0.3rem" }}>
      {[...Array(fullStars)].map((_, i) => (
        <BsStarFill key={i} size={starSize} />
      ))}
      {[...Array(halfStars)].map((_, i) => (
        <BsStarHalf key={i} size={starSize} />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <BsStar key={i} size={starSize} />
      ))}
    </FlexDiv>
  );
};

export const ReviewsLink = ({ product }: { product: ProductPageProduct }) => {
  const label = product.reviewCount
    ? `${product.averageStars}/5 based on ${product.reviewCount} reviews`
    : "No reviews yet";

  return (
    <FlexDiv align>
      <Tooltip label={label}>
        <Stars rating={product.averageStars} />
      </Tooltip>

      <TextLink href={`/products/${product.id}/reviews${!product.reviewCount ? "/add" : ""}`}>
        <Text>
          {product.reviewCount ? `Read ${product.reviewCount} reviews` : "Write a review"}
        </Text>
      </TextLink>
    </FlexDiv>
  );
};
