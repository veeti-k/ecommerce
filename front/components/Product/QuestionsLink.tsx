import { Link } from "@chakra-ui/react";
import { ProductPageProduct } from "../../types";
import { Text } from "../Text";
import NextLink from "next/link";

export const QuestionsLink = ({ product }: { product: ProductPageProduct }) => {
  return (
    <NextLink
      href={`/products/${product.id}/questions${!product.questionCount ? "/add" : ""}`}
      passHref
    >
      <Link>
        <Text>
          {product.questionCount ? `${product.questionCount} questions` : "Ask the first question"}
        </Text>
      </Link>
    </NextLink>
  );
};
