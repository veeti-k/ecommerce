import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Card } from "../../components/Card";
import { ProductForm, ProductFormValues } from "../../components/Forms/ProductForm";
import { Layout } from "../../components/layouts/Layout";
import { TitleContainer } from "../../components/pages/Settings";
import { Heading } from "../../components/Text";
import { Category, ProductPageProduct, ResolvedCategory } from "../../types";
import { request } from "../../utils/requests";
import { apiRoutes } from "../../utils/routes";

const ProductEdit: NextPage = () => {
  const router = useRouter();

  // this page should only be accessed on /products/[id]/edit
  if (!router.query?.id || !Array.isArray(router.query.id) || router.query.id.length !== 2)
    return null;
  if (router.query.id[1] !== "edit") return null;

  const productId = router.query.id[0] as string;

  const [product, setProduct] = useState<ProductPageProduct | undefined>();
  const [resolvedCategories, setResolvedCategories] = useState<ResolvedCategory[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);

  useEffect(() => {
    (async () => {
      const notifId = toast.loading("Loading the product");

      const res = await request({
        method: "GET",
        path: apiRoutes.products.product(productId),
      });

      toast.dismiss(notifId);

      if (res) setProduct(res.data);
    })();

    (async () => {
      const res = await request({
        method: "GET",
        path: apiRoutes.categoriesRoot,
      });

      if (res) {
        setResolvedCategories((res.data as any)["resolvedCategories"]);
        setAllCategories((res.data as any)["allCategories"]);
      }
    })();
  }, []);

  const onSubmit = async (values: ProductFormValues) => {
    const notifId = toast.loading("Updating the product");

    const res = await request({
      method: "PATCH",
      path: apiRoutes.products.product(productId),
      body: {
        name: values.name,
        price: values.price,
        description: values.description,
        discountedPrice: values.discountedPrice,
        discountPercent: values.discountPercent,
        discountAmount: values.discountAmount,
        isDiscounted: values.isDiscounted,
        bulletPoints: values.bulletPoints,
        imageLinks: values.imageLinks,
        categoryId: values.categoryId,
      },
    });

    toast.dismiss(notifId);

    if (res) toast.success("Product updated");
  };

  return (
    <Layout categories={resolvedCategories}>
      <Card>
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
