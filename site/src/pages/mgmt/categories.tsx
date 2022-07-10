import { useRouter } from "next/router";
import { Page } from "types/Page";

import { Flags } from "@ecommerce/shared";
import {
  Card,
  FlexDiv,
  H3,
  Input,
  PageTitle,
  PageTitleContainer,
  Text,
} from "@ecommerce/ui";

import { Layout } from "~components/Layouts/Layout";
import { AddCategory } from "~components/Management/Categories/AddCategory";
import { EditCategory } from "~components/Management/Categories/EditCategory";
import { trpc } from "~utils/trpc";

export const CategoriesPage: Page = () => {
  const router = useRouter();
  const query = (router.query.query as string) || "";
  const { data: categories } = trpc.useQuery([
    "categories.get-with-query-db",
    {
      query,
    },
  ]);

  return (
    <Layout title="Mgmt - Categories">
      <PageTitleContainer>
        <PageTitle>Categories</PageTitle>
      </PageTitleContainer>

      <FlexDiv column gap05>
        <Card>
          <FlexDiv gap05 justifyBetween fullWidth>
            <Input
              value={query}
              onChange={({ target: { value } }) =>
                value
                  ? router.push(`/mgmt/categories?query=${value}`)
                  : router.push("/mgmt/categories")
              }
              placeholder="Filter categories"
            />

            <AddCategory />
          </FlexDiv>
        </Card>

        <FlexDiv gap05 column>
          {categories?.map((category) => {
            const parent = categories.find((c) => c.id === category.parentId);

            return (
              <Card key={category.id}>
                <FlexDiv justifyBetween>
                  <FlexDiv column>
                    <H3>{category.name}</H3>
                    {parent && <Text>Parent: {parent?.name}</Text>}
                  </FlexDiv>

                  <EditCategory category={category} />
                </FlexDiv>
              </Card>
            );
          })}
        </FlexDiv>
      </FlexDiv>
    </Layout>
  );
};

CategoriesPage.requireAuth = true;
CategoriesPage.requiredFlags = [Flags.ManageCategories];

export default CategoriesPage;
