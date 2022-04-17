import { Divider, Tooltip } from "@chakra-ui/react";
import { styled } from "../../stitches.config";
import { ProductPageProduct } from "../../types/Product";
import { routes } from "../../utils/routes";
import { FlexDiv } from "../Containers";
import { TextLink } from "../Link";
import { Text } from "../Text";
import { Stars } from "./Stars";

const ReviewsLink = ({ product }: { product: ProductPageProduct }) => (
  <FlexDiv align>
    <TextLink
      href={
        product.reviewCount
          ? routes.product.reviews(product.id)
          : routes.product.reviewsAdd(product.id)
      }
    >
      <Text>{product.reviewCount ? `${product.reviewCount} reviews` : "Write a review"}</Text>
    </TextLink>
  </FlexDiv>
);

const QuestionsLink = ({ product }: { product: ProductPageProduct }) => {
  return (
    <TextLink
      href={
        product.questionCount
          ? routes.product.questions(product.id)
          : routes.product.questionsAdd(product.id)
      }
    >
      <Text>
        {product.questionCount ? `${product.questionCount} questions` : "Ask the first question"}
      </Text>
    </TextLink>
  );
};

const Div = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",

  "@mobileAndUp": {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "0.3rem",
    gap: "1rem",
  },
});

export const StarsReviewsQuestions = ({ product }: { product: ProductPageProduct }) => {
  const reviewLabel = product.reviewCount
    ? `${product.averageStars}/5 based on ${product.reviewCount} reviews`
    : "No reviews yet";

  return (
    <Div>
      <Tooltip label={reviewLabel}>
        <Stars rating={product.averageStars} />
      </Tooltip>

      <FlexDiv
        style={{
          height: "calc(1rem + 5px)",
        }}
        align
      >
        <ReviewsLink product={product} />
        <Divider orientation="vertical" />
        <QuestionsLink product={product} />
      </FlexDiv>
    </Div>
  );
};
