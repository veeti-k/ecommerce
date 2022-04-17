import { FC } from "react";
import { ProductReview } from "../../types/ProductReview";
import { Card, CardContent } from "../Card";
import { FlexDiv } from "../Containers";
import { Markdown } from "../Markdown";
import { Heading, Text } from "../Text";
import { Stars } from "./Stars";

type Props = {
  review: Omit<ProductReview, "id" | "productId" | "createdAt">;
};

export const Review: FC<Props> = ({ review }) => (
  <Card shadowNear>
    <CardContent lessPadding>
      <FlexDiv>
        <FlexDiv>
          <Stars rating={review.stars} />
        </FlexDiv>

        <FlexDiv column>
          <Heading>{review.title ? review.title : "Title"}</Heading>

          <div>
            <Markdown>{review.content ? review.content : "Review"}</Markdown>
          </div>

          <Text light>{review.reviewersNickname ? review.reviewersNickname : "Nickname"}</Text>
        </FlexDiv>
      </FlexDiv>
    </CardContent>
  </Card>
);
