import { FC } from "react";
import { styled } from "../../stitches.config";
import { ProductQuestion } from "../../types/ProductQuestion";
import { Card, CardContent } from "../Card";
import { FlexDiv } from "../Containers";
import { Markdown } from "../Markdown";
import { Heading, Text } from "../Text";

type Props = {
  question: Omit<ProductQuestion, "id" | "productId" | "createdAt">;
};

const Div = styled(FlexDiv, {
  flexDirection: "column",

  "@mobileAndUp": {
    flexDirection: "row",
  },
});

export const Question: FC<Props> = ({ question }) => (
  <Card shadowNear>
    <CardContent lessPadding>
      <Div>
        <FlexDiv column>
          <Heading>{question.title ? question.title : "Title"}</Heading>

          <div>
            <Markdown>{question.content ? question.content : "Question"}</Markdown>
          </div>

          <Text light>
            {question.questionersNickname ? question.questionersNickname : "Nickname"}
          </Text>
        </FlexDiv>
      </Div>
    </CardContent>
  </Card>
);
