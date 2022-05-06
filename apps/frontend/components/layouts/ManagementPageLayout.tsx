import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useContext } from "react";
import { useHasMounted } from "../../hooks/useHasMounted";
import { ResolvedCategory } from "../../types/Category";
import { UserContext } from "../../UserProvider/provider";
import { isAdmin } from "../../utils/flagResolve";
import { pushUser } from "../../utils/router";
import { routes } from "../../utils/routes";
import { Card } from "../Card";
import { FlexDiv } from "../Containers";
import { ProductsIcon, OrdersIcon, UserIcon, PlusIcon } from "../Icons";
import { Text, PageTitle } from "../Text";
import { Layout } from "./Layout";
import { PageTitleContainer, PageSelectorButtons, PageSelectorButton, MainContent } from "./Styles";

type ManagementPageLayoutProps = {
  categories: ResolvedCategory[];
};

export const ManagementPageLayout: FC<ManagementPageLayoutProps> = ({ children, categories }) => {
  const router = useRouter();

  const { state } = useContext(UserContext);

  const hasMounted = useHasMounted();

  const isLoggedIn = state.userId && state.status === "loaded";

  if (!isLoggedIn) pushUser(router, "/", "managementPageLayout::isLoggedIn, isAdmin false");

  return (
    <Layout categories={categories}>
      <>
        <PageTitleContainer>
          <PageTitle>Management</PageTitle>
        </PageTitleContainer>
        <Card shadowFar>
          {hasMounted && isLoggedIn && isAdmin(state.flags) ? (
            <FlexDiv gap0>
              <PageSelectorButtons>
                <Button
                  // prettier-ignore
                  onClick={() =>pushUser(router, routes.managementAddProduct, "pageSelectorButton::onClick")}
                  style={{ marginBottom: "0.5rem" }}
                >
                  <FlexDiv gap05>
                    <PlusIcon /> <Text>Add a product</Text>
                  </FlexDiv>
                </Button>

                <PageSelectorButton
                  route={routes.managementCategories}
                  active={window.location.pathname.includes("categories")}
                >
                  <ProductsIcon /> <Text>Categories</Text>
                </PageSelectorButton>

                <PageSelectorButton
                  route={routes.managementOrders}
                  active={window.location.pathname.includes("orders")}
                >
                  <OrdersIcon /> <Text>Orders</Text>
                </PageSelectorButton>

                <PageSelectorButton
                  route={routes.managementUsers}
                  active={window.location.pathname.includes("users")}
                >
                  <UserIcon /> <Text>Users</Text>
                </PageSelectorButton>
              </PageSelectorButtons>

              <MainContent>{children}</MainContent>
            </FlexDiv>
          ) : null}
        </Card>
      </>
    </Layout>
  );
};
