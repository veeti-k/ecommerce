import { FC } from "react";
import { ProductReview } from "../../types/Product";
import { Card } from "../Card";
import { FlexDiv } from "../Containers";
import { Markdown } from "../Markdown";
import { Heading, Text } from "../Text";
import { Stars } from "./ReviewsLink";

type Props = {
  review: Omit<ProductReview, "id" | "productId" | "createdAt">;
};

export const Review: FC<Props> = ({ review }) => (
  <Card shadowNear>
    <FlexDiv>
      <FlexDiv>
        <Stars rating={review.stars} />
      </FlexDiv>

      <FlexDiv column>
        <Heading>{review.title ? review.title : "Title"}</Heading>

        <Markdown>{review.content ? review.content : "Review"}</Markdown>

        <Text light>{review.reviewersNickname ? review.reviewersNickname : "Nickname"}</Text>
      </FlexDiv>
    </FlexDiv>
  </Card>
);
