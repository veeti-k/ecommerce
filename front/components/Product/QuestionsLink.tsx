import { Text } from "../Text";
import { ProductPageProduct } from "../../types/Product";
import { TextLink } from "../Link";

export const QuestionsLink = ({ product }: { product: ProductPageProduct }) => {
  return (
    <TextLink href={`/products/${product.id}/questions${!product.questionCount ? "/add" : ""}`}>
      <Text>
        {product.questionCount ? `${product.questionCount} questions` : "Ask the first question"}
      </Text>
    </TextLink>
  );
};
