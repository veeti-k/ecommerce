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
import { STATIC_PROPS_REQUESTS } from "../../../utils/getStaticProps";
import { AddProductRequest } from "../../../utils/Requests/Product";

const AddProduct: NextPage<Props> = ({ resolvedCategory }) => {
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
    <ManagementPageLayout categories={resolvedCategory}>
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

type Props = {
  resolvedCategory: ResolvedCategory[];
};

export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<Props>> => {
  const resolvedCategory = await STATIC_PROPS_REQUESTS.Categories.getAllResolved();

  return {
    props: {
      resolvedCategory,
    },
  };
};
