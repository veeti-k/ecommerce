import { Breadcrumb as ChakraBreadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { FC } from "react";
import { useHasMounted } from "../../hooks/useHasMounted";
import { styled } from "../../stitches.config";
import { ProductPageProduct } from "../../types/Product";
import { routes } from "../../utils/routes";
import { Link } from "../Link";
import { Text } from "../Text";

interface Props {
  product: ProductPageProduct;
}

const Breadcrumb = styled(ChakraBreadcrumb, {
  padding: "0.2rem 0.8rem",

  "@mobileAndUp": {
    padding: "0.3rem 0",
  },
});

export const ProductPath: FC<Props> = ({ product }) => {
  const hasMounted = useHasMounted();
  if (!hasMounted) return null;

  const onReviewsPage = window.location.pathname.includes("reviews");
  const onReviewsAddPage = window.location.pathname.includes("reviews/write");

  return (
    <Breadcrumb separator={<Text>/</Text>}>
      <BreadcrumbItem>
        <Link href={routes.home}>
          <BreadcrumbLink>
            <Text>Home</Text>
          </BreadcrumbLink>
        </Link>
      </BreadcrumbItem>

      {product.path?.length &&
        product.path.map((category) => (
          <BreadcrumbItem key={category.categoryId}>
            <Link href={routes.categories(category.categoryId)}>
              <BreadcrumbLink>
                <Text>{category.name}</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        ))}

      <BreadcrumbItem>
        <Text aria-current>
          Product: <strong>{product.productId}</strong>
        </Text>
      </BreadcrumbItem>

      {onReviewsPage && !onReviewsAddPage && (
        <BreadcrumbItem>
          <Text aria-current>Reviews</Text>
        </BreadcrumbItem>
      )}

      {onReviewsAddPage && (
        <BreadcrumbItem>
          <Text aria-current>Write a review</Text>
        </BreadcrumbItem>
      )}
    </Breadcrumb>
  );
};
