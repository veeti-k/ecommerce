import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import toast from "react-hot-toast";
import { ProductForm, ProductFormValues } from "../../../components/Forms/ProductForm";
import { ManagementPageLayout } from "../../../components/layouts/ManagementPageLayout";
import { Heading } from "../../../components/Text";
import { ResolvedCategory } from "../../../types";
import { getCategories_STATIC_PROPS } from "../../../utils/getStaticProps";
import { request } from "../../../utils/requests";
import { apiRoutes } from "../../../utils/routes";

type Result = {
  categories: ResolvedCategory[];
};

export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<Result>> => {
  const categories = await getCategories_STATIC_PROPS();

  return {
    props: {
      categories,
    },
  };
};

const AddProduct: NextPage<Result> = ({ categories }) => {
  const onSubmit = async (values: ProductFormValues) => {
    const notifId = toast.loading("Adding the product");

    const res = await request({
      method: "POST",
      path: apiRoutes.productsRoot,
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

    if (res) toast.success("Product added");
  };

  return (
    <ManagementPageLayout categories={categories}>
      <Heading style={{ paddingBottom: "1rem" }}>Add a product</Heading>

      <ProductForm onSubmit={onSubmit} categories={categories} />
    </ManagementPageLayout>
  );
};

export default AddProduct;
