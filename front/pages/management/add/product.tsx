import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import toast from "react-hot-toast";
import { ProductForm, ProductFormValues } from "../../../components/Forms/ProductForm";
import { ManagementPageLayout } from "../../../components/layouts/ManagementPageLayout";
import { TitleContainer } from "../../../components/layouts/Styles";
import { Heading } from "../../../components/Text";
import { useGetCategories } from "../../../hooks/useGetCategories";
import { ResolvedCategory } from "../../../types";
import { getCategories_STATIC_PROPS } from "../../../utils/getStaticProps";
import { AddProductRequest } from "../../../utils/Requests/Product";

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
  const { allCategories } = useGetCategories();

  const onSubmit = async (values: ProductFormValues) => {
    const notifId = toast.loading("Adding product");

    const res = await AddProductRequest(values);

    toast.dismiss(notifId);

    if (res) toast.success("Product added");
  };

  return (
    <ManagementPageLayout categories={categories}>
      <TitleContainer>
        <Heading>Add a product</Heading>
      </TitleContainer>

      <ProductForm onSubmit={onSubmit} categories={allCategories} submitButtonText="Add" />
    </ManagementPageLayout>
  );
};

export default AddProduct;
