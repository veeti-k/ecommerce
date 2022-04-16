import { Button } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Card } from "../../../components/Card";
import { MgmtSettingsPageScrollableContent } from "../../../components/Containers";
import { ProductForm, ProductFormValues } from "../../../components/Forms/ProductForm";
import { ArrowLeftIcon } from "../../../components/Icons";
import { Layout } from "../../../components/layouts/Layout";
import { PageTitleContainer } from "../../../components/layouts/Styles";
import { Link } from "../../../components/Link";
import { BiggerHeading } from "../../../components/Text";
import { useGetCategories } from "../../../hooks/useGetCategories";
import { ProductPageProduct } from "../../../types/Product";
import { GetProductRequest, UpdateProductRequest } from "../../../utils/Requests/Product";
import { routes } from "../../../utils/routes";

const ProductEdit: NextPage = () => {
  const router = useRouter();

  const productId = Number(router.query.productId);

  const { allCategories, resolvedCategories } = useGetCategories();
  const [product, setProduct] = useState<ProductPageProduct>();

  useEffect(() => {
    (async () => {
      if (!productId) return;

      const res = await GetProductRequest(productId);

      if (res) setProduct(res.data);
    })();
  }, [productId]);

  if (!productId) return null;

  const onSubmit = async (values: ProductFormValues) => {
    const notifId = toast.loading("Updating the product");

    const res = await UpdateProductRequest(productId, values);

    toast.dismiss(notifId);

    if (res) toast.success("Product updated");
  };

  return (
    <Layout categories={resolvedCategories}>
      <PageTitleContainer>
        <BiggerHeading>Edit product</BiggerHeading>

        <Link href={routes.productRoot(productId)}>
          <Button leftIcon={<ArrowLeftIcon />}>Back to product page</Button>
        </Link>
      </PageTitleContainer>
      <Card shadowFar padding0>
        <MgmtSettingsPageScrollableContent style={{ maxHeight: "calc(100vh - 12rem)" }}>
          <ProductForm
            categories={allCategories}
            initialValues={product}
            onSubmit={onSubmit}
            submitButtonText="Update"
          />
        </MgmtSettingsPageScrollableContent>
      </Card>
    </Layout>
  );
};

export default ProductEdit;
