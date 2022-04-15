import { Heading, UnorderedList, ListItem } from "@chakra-ui/react";
import { FC } from "react";
import { Paragraph, Text } from "./Text";
import ReactMarkdown from "react-markdown";

type Props = {
  children: string;
};

export const Markdown: FC<Props> = ({ children }) => (
  <ReactMarkdown
    components={{
      h2: ({ node, ...props }) => <Heading {...props} />,
      ul: ({ node, ...props }) => <UnorderedList {...props} />,
      li: ({ node, ...props }) => (
        <ListItem {...props}>
          <Text>{props.children}</Text>
        </ListItem>
      ),
      p: ({ node, ...props }) => <Paragraph {...props} />,
    }}
  >
    {children}
  </ReactMarkdown>
);
