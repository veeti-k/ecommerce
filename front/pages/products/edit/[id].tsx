import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Card } from "../../../components/Card";
import { ProductForm, ProductFormValues } from "../../../components/Forms/ProductForm";
import { Layout } from "../../../components/layouts/Layout";
import { TitleContainer } from "../../../components/layouts/Styles";
import { Heading } from "../../../components/Text";
import { useGetCategories } from "../../../hooks/useGetCategories";
import { ProductPageProduct } from "../../../types/Product";
import { GetProductRequest, UpdateProductRequest } from "../../../utils/Requests/Product";

const ProductEdit: NextPage = () => {
  const router = useRouter();

  const productId = Number(router.query.id);

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
      <Card padding0>
        <TitleContainer>
          <Heading>Edit product</Heading>
        </TitleContainer>

        <ProductForm
          categories={allCategories}
          initialValues={product}
          onSubmit={onSubmit}
          submitButtonText="Update"
        />
      </Card>
    </Layout>
  );
};

export default ProductEdit;
