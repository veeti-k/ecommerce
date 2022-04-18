import { Button } from "@chakra-ui/react";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import toast from "react-hot-toast";
import { Card, CardContent } from "../../../components/Card";
import { ProductForm, ProductFormValues } from "../../../components/Forms/ProductForm";
import { ArrowLeftIcon } from "../../../components/Icons";
import { Layout } from "../../../components/layouts/Layout";
import { PageTitleContainer } from "../../../components/layouts/Styles";
import { Link } from "../../../components/Link";
import { BiggerHeading } from "../../../components/Text";
import { Category, ResolvedCategory } from "../../../types/Category";
import { ProductPageProduct } from "../../../types/Product";
import {
  getProduct_STATIC_PROPS,
  getCategories_STATIC_PROPS,
  getAllCategories_STATIC_PROPS,
} from "../../../utils/getStaticProps";
import { UpdateProductRequest } from "../../../utils/Requests/Product";
import { routes } from "../../../utils/routes";

const ProductEdit: NextPage<Result> = ({ categories, allCategories, product }) => {
  if (!categories || !product || !allCategories) return null;

  const onSubmit = async (values: ProductFormValues) => {
    const notifId = toast.loading("Updating the product");

    const res = await UpdateProductRequest(product.id, values);

    toast.dismiss(notifId);

    if (res) toast.success("Product updated");
  };

  return (
    <Layout categories={categories} lessPaddingOnMobile>
      <PageTitleContainer>
        <BiggerHeading>Edit product</BiggerHeading>

        <Link href={routes.productRoot(product.id)}>
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

type Result = {
  product: ProductPageProduct | null;
  categories: ResolvedCategory[] | null;
  allCategories: Category[] | null;
};

export const getStaticProps: GetStaticProps = async (
  context
): Promise<GetStaticPropsResult<Result>> => {
  const productId = context.params!.productId! as string;

  const product = productId == "0" ? null : await getProduct_STATIC_PROPS(productId);
  const categories = productId == "0" ? null : await getCategories_STATIC_PROPS();
  const allCategories = productId == "0" ? null : await getAllCategories_STATIC_PROPS();

  return {
    props: {
      product,
      categories,
      allCategories,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          productId: "0",
        },
      },
    ],
    fallback: "blocking",
  };
};

export default ProductEdit;
