import { Heading, UnorderedList, ListItem } from "@chakra-ui/react";
import { FC } from "react";
import { Paragraph, Text } from "./Text";
import ReactMarkdown from "react-markdown";
import { styled } from "../stitches.config";

type Props = {
  children: string;
};

const MarkdownP = styled(Paragraph, {
  fontSize: "1rem",

  "&:not(:first-child)": {
    paddingTop: "1rem",
  },
});

export const Markdown: FC<Props> = ({ children }) => (
  <ReactMarkdown
    components={{
      h2: ({ node, ...props }) => <Heading {...props} />,
      ul: ({ node, ...props }) => <UnorderedList {...props} />,
      li: ({ node, ...props }) => (
        <ListItem {...props}>
          <Text style={{ fontSize: "1rem" }}>{props.children}</Text>
        </ListItem>
      ),
      p: ({ node, ...props }) => <MarkdownP {...props} />,
    }}
  >
    {children}
  </ReactMarkdown>
);
