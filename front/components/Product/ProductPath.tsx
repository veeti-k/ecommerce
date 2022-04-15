import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";
import { ProductPageProduct } from "../../types/Product";
import { routes } from "../../utils/routes";

interface Props {
  product: ProductPageProduct;
}

export const ProductPath: FC<Props> = ({ product }) => {
  if (typeof window == null) return null;

  const onReviewsPage = window.location.pathname.includes("reviews");
  const onReviewsAddPage = window.location.pathname.includes("add");

  return (
    <Breadcrumb style={{ padding: "0.3rem 0", paddingTop: "0.5rem" }}>
      <BreadcrumbItem>
        <Link href={routes.home} passHref>
          <BreadcrumbLink>Home</BreadcrumbLink>
        </Link>
      </BreadcrumbItem>

      {product.path?.length &&
        product.path.map((category) => (
          <BreadcrumbItem key={category.id}>
            <Link href={routes.category(category.id)} passHref>
              <BreadcrumbLink>{category.name}</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        ))}

      <BreadcrumbItem>
        <Link href={routes.productRoot(product.id)} passHref>
          <BreadcrumbLink>{product.id}</BreadcrumbLink>
        </Link>
      </BreadcrumbItem>

      {onReviewsPage && !onReviewsAddPage && (
        <BreadcrumbItem>
          <Link href={routes.product.reviews(product.id)} passHref>
            <BreadcrumbLink>Reviews</BreadcrumbLink>
          </Link>
        </BreadcrumbItem>
      )}

      {onReviewsAddPage && (
        <BreadcrumbItem>
          <Link href={routes.product.reviewsAdd(product.id)} passHref>
            <BreadcrumbLink>Add a review</BreadcrumbLink>
          </Link>
        </BreadcrumbItem>
      )}
    </Breadcrumb>
  );
};
