import { FC } from "react";
import { styled } from "../../stitches.config";
import { ProductReview } from "../../types/ProductReview";
import { Card, CardContent } from "../Card";
import { FlexDiv } from "../Containers";
import { Markdown } from "../Markdown";
import { Heading, Text } from "../Text";
import { Stars } from "./Stars";

type Props = {
  review: Omit<ProductReview, "id" | "productId" | "createdAt">;
};

const Div = styled(FlexDiv, {
  flexDirection: "column",

  "@mobileAndUp": {
    flexDirection: "row",
  },
});

export const Review: FC<Props> = ({ review }) => (
  <Card shadowNear>
    <CardContent lessPadding>
      <Div>
        <div>
          <Stars rating={review.stars} />
        </div>

        <FlexDiv column>
          <Heading>{review.title ? review.title : "Title"}</Heading>

          <div>
            <Markdown>{review.content ? review.content : "Review"}</Markdown>
          </div>

          <Text light>{review.reviewersNickname ? review.reviewersNickname : "Nickname"}</Text>
        </FlexDiv>
      </Div>
    </CardContent>
  </Card>
);
