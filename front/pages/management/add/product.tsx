import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import toast from "react-hot-toast";
import { CardContent } from "../../../components/Card";
import { MgmtSettingsPageScrollableContent } from "../../../components/Containers";
import { ProductFormValues, ProductForm } from "../../../components/Forms/ProductForm";
import { ManagementPageLayout } from "../../../components/layouts/ManagementPageLayout";
import { TitleContainer } from "../../../components/layouts/Styles";
import { Heading } from "../../../components/Text";
import { useGetCategories } from "../../../hooks/useGetCategories";
import { ResolvedCategory } from "../../../types/Category";
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

    const res = await AddProductRequest({
      ...values,
      price: Number(values.price),
      discountedPrice: Number(values.discountedPrice),
      discountAmount: Number(values.discountAmount),
      discountPercent: Number(values.discountPercent),
    });

    toast.dismiss(notifId);

    if (res) toast.success("Product added");
  };

  return (
    <ManagementPageLayout categories={categories}>
      <TitleContainer>
        <Heading>Add a product</Heading>
      </TitleContainer>

      <MgmtSettingsPageScrollableContent style={{ maxHeight: "calc(100vh - 14rem)" }}>
        <CardContent>
          <ProductForm onSubmit={onSubmit} categories={allCategories} submitButtonText="Add" />
        </CardContent>
      </MgmtSettingsPageScrollableContent>
    </ManagementPageLayout>
  );
};

export default AddProduct;
