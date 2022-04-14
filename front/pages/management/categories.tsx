import { NextPage } from "next";
import { useEffect, useState } from "react";
import { InfoCard } from "../../components/Card";
import { FlexDiv, MgmtSettingsPageScrollableContent } from "../../components/Containers";
import { AddCategoryDialog } from "../../components/Dialogs/Category/AddCategoryDialog";
import { DeleteCategoryDialog } from "../../components/Dialogs/Category/DeleteCategoryDialog";
import { EditCategoryDialog } from "../../components/Dialogs/Category/EditCategoryDialog";
import { ManagementPageLayout } from "../../components/layouts/ManagementPageLayout";
import { TitleContainer } from "../../components/layouts/Styles";
import { Heading } from "../../components/Text";
import { Category, ResolvedCategory } from "../../types";
import { GetCategoriesRequest } from "../../utils/Requests/Category";

const Categories: NextPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [resolvedCategories, setResolvedCategories] = useState<ResolvedCategory[]>([]);

  const getCategories = async () => {
    const res = await GetCategoriesRequest();

    if (res) {
      setCategories(res.data["allCategories"]);
      setResolvedCategories(res.data["resolvedCategories"]);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <ManagementPageLayout categories={resolvedCategories}>
      <TitleContainer>
        <Heading>Categories</Heading>

        <AddCategoryDialog categories={categories} getCategories={getCategories} />
      </TitleContainer>

      <MgmtSettingsPageScrollableContent>
        <FlexDiv column gap05>
          {categories.map((category) => (
            <InfoCard key={category.id}>
              <FlexDiv spaceBetween fullWidth>
                <Heading>{category.name}</Heading>
                <FlexDiv gap05>
                  <DeleteCategoryDialog category={category} getCategories={getCategories} />

                  <EditCategoryDialog
                    categories={categories}
                    category={category}
                    getCategories={getCategories}
                  />
                </FlexDiv>
              </FlexDiv>
            </InfoCard>
          ))}
        </FlexDiv>
      </MgmtSettingsPageScrollableContent>
    </ManagementPageLayout>
  );
};

export default Categories;
