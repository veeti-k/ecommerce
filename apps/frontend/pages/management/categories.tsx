import { NextPage } from "next";
import { useEffect, useState } from "react";
import { CardContent, InfoCard } from "../../components/Card";
import { CardContentWrapper, FlexDiv } from "../../components/Containers";
import { AddCategoryDialog } from "../../components/Dialogs/Category/NewCategoryDialog";
import { DeleteCategoryDialog } from "../../components/Dialogs/Category/DeleteCategoryDialog";
import { EditCategoryDialog } from "../../components/Dialogs/Category/EditCategoryDialog";
import { MgmtPageLayout } from "../../components/layouts/Management/ManagementPageLayout";
import { TitleContainer } from "../../components/layouts/Styles";
import { Heading } from "../../components/Text";
import { Category, ResolvedCategory } from "../../types/Category";
import { GetCategoriesRequest } from "../../utils/Requests/Category";

const Categories: NextPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [resolvedCategories, setResolvedCategories] = useState<ResolvedCategory[]>([]);

  const getCategories = async () => {
    const res = await GetCategoriesRequest();

    if (res) {
      setCategories(res.data["categories"]);
      setResolvedCategories(res.data["resolvedCategories"]);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <MgmtPageLayout categories={resolvedCategories}>
      <TitleContainer withButton>
        <Heading>Categories</Heading>

        <AddCategoryDialog categories={categories} getCategories={getCategories} />
      </TitleContainer>

      <CardContentWrapper scrollableMaxHeigth="calc(100vh - 15rem)">
        <CardContent>
          <FlexDiv column gap05>
            {categories.map((category) => (
              <InfoCard key={category.categoryId}>
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
        </CardContent>
      </CardContentWrapper>
    </MgmtPageLayout>
  );
};

export default Categories;
