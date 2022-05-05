import { Button } from "@chakra-ui/react";
import { FC } from "react";
import { styled } from "../../stitches.config";
import { ProductReview } from "../../types/ProductReview";
import { routes } from "../../utils/routes";
import { Card, CardContent } from "../Card";
import { FlexDiv } from "../Containers";
import { Link } from "../Link";
import { Markdown } from "../Markdown";
import { Heading, Text } from "../Text";
import { Stars } from "./Stars";

type Props =
  | {
      showCommentButton: boolean;
      review: Omit<ProductReview, "createdAt">;
    }
  | {
      showCommentButton?: never;
      review: Omit<ProductReview, "reviewId" | "productId" | "createdAt">;
    };

const Div = styled(FlexDiv, {
  flexDirection: "column",

  "@mobileAndUp": {
    flexDirection: "row",
  },
});

export const Review: FC<Props> = ({ review, showCommentButton }) => (
  <Card shadowNear>
    <CardContent lessPadding>
      <Div>
        <div>
          <Stars rating={review.stars} />
        </div>

        <FlexDiv column>
          <FlexDiv column>
            <Heading>{review.title ? review.title : "Title"}</Heading>

            <div>
              <Markdown>{review.content ? review.content : "Review"}</Markdown>
            </div>

            <Text light>{review.reviewersNickname ? review.reviewersNickname : "Nickname"}</Text>
          </FlexDiv>

          {showCommentButton && (
            <div>
              <Link href={routes.product.reviewComment(review.productId, review.reviewId)}>
                <Button size="sm">Write a comment</Button>
              </Link>
            </div>
          )}
        </FlexDiv>
      </Div>
    </CardContent>
  </Card>
);
