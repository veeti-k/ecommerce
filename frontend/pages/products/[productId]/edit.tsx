import { Button } from "@chakra-ui/react";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import toast from "react-hot-toast";
import { Card, CardContent } from "../../../components/Card";
import { ProductFormValues, ProductForm } from "../../../components/Forms/ProductForm";
import { ArrowLeftIcon } from "../../../components/Icons";
import { Layout } from "../../../components/layouts/Layout";
import { PageTitleContainer } from "../../../components/layouts/Styles";
import { Link } from "../../../components/Link";
import { BiggerHeading } from "../../../components/Text";
import { Category, ResolvedCategory } from "../../../types/Category";
import { ProductPageProduct } from "../../../types/Product";
import { STATIC_PROPS_REQUESTS } from "../../../utils/getStaticProps";

import { UpdateProductRequest } from "../../../utils/Requests/Product";
import { routes } from "../../../utils/routes";

const ProductEdit: NextPage<Result> = ({ resolvedCategories, allCategories, product, valid }) => {
  if (!valid) return null;

  const onSubmit = async (values: ProductFormValues) => {
    const notifId = toast.loading("Updating the product");

    const res = await UpdateProductRequest(product.productId, values);

    toast.dismiss(notifId);

    if (res) toast.success("Product updated");
  };

  return (
    <Layout categories={resolvedCategories} lessPaddingOnMobile>
      <PageTitleContainer>
        <BiggerHeading>Edit product</BiggerHeading>

        <Link href={routes.productRoot(product.productId)}>
          <Button size="sm" leftIcon={<ArrowLeftIcon />}>
            Back to product page
          </Button>
        </Link>
      </PageTitleContainer>

      <Card shadowFar>
        <CardContent>
          <ProductForm
            categories={allCategories}
            initialValues={product}
            onSubmit={onSubmit}
            submitButtonText="Update"
          />
        </CardContent>
      </Card>
    </Layout>
  );
};

type Result =
  | {
      product: ProductPageProduct;
      resolvedCategories: ResolvedCategory[];
      allCategories: Category[];
      valid: true;
    }
  | {
      product?: never;
      resolvedCategories?: never[];
      allCategories?: never[];
      valid: false;
    };

export const getStaticProps: GetStaticProps = async (
  context
): Promise<GetStaticPropsResult<Result>> => {
  const productId = context.params!.productId! as string;

  if (productId === "NO_BUILD") return { props: { valid: false } };

  const product = await STATIC_PROPS_REQUESTS.Products.getById(Number(productId));
  const categories = await STATIC_PROPS_REQUESTS.Categories.getAllResolved();
  const allCategories = await STATIC_PROPS_REQUESTS.Categories.getAll();

  return {
    props: {
      product,
      resolvedCategories: categories,
      allCategories,
      valid: true,
    },
  };
};

export const getStaticPaths = async () => ({
  paths: [
    {
      params: {
        productId: "NO_BUILD",
      },
    },
  ],
  fallback: "blocking",
});

export default ProductEdit;
