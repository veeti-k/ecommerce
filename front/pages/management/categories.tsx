import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Card } from "../../components/Card";
import { FlexDiv, MgmtSettingsPageScrollableContent } from "../../components/Containers";
import { AddCategoryModal } from "../../components/Dialogs/Category/AddCategoryModal";
import { DeleteCategoryModal } from "../../components/Dialogs/Category/DeleteCategoryModal";
import { EditCategoryModal } from "../../components/Dialogs/Category/EditCategoryModal";
import { ManagementPageLayout } from "../../components/layouts/ManagementPageLayout";
import { TitleContainer } from "../../components/layouts/Styles";
import { Heading } from "../../components/Text";
import { styled } from "../../stitches.config";
import { Category, ResolvedCategory } from "../../types";
import { getCategories_STATIC_PROPS } from "../../utils/getStaticProps";
import { request } from "../../utils/requests";
import { apiRoutes } from "../../utils/routes";

const CategoryCard = styled(Card, {
  padding: "1rem",
  boxShadow: "rgba(99, 99, 99, 0.1) 0px 2px 8px 0px",
});

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

const Categories: NextPage<Result> = (props) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    const notifId = toast.loading("Getting categories...");

    const res = await request({
      method: "GET",
      path: apiRoutes.categoriesRoot,
    });

    toast.dismiss(notifId);

    if (res) setCategories((res.data as any)["allCategories"]);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <ManagementPageLayout categories={props.categories}>
      <TitleContainer>
        <Heading>Categories</Heading>

        <AddCategoryModal categories={categories} getCategories={getCategories} />
      </TitleContainer>

      <MgmtSettingsPageScrollableContent>
        <FlexDiv column gap05>
          {categories.map((category) => (
            <CategoryCard key={category.id}>
              <FlexDiv spaceBetween fullWidth>
                <Heading>{category.name}</Heading>
                <FlexDiv gap05>
                  <DeleteCategoryModal category={category} getCategories={getCategories} />

                  <EditCategoryModal
                    categories={categories}
                    category={category}
                    getCategories={getCategories}
                  />
                </FlexDiv>
              </FlexDiv>
            </CategoryCard>
          ))}
        </FlexDiv>
      </MgmtSettingsPageScrollableContent>
    </ManagementPageLayout>
  );
};

export default Categories;
