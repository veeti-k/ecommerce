import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useContext } from "react";
import { useIsLoggedIn } from "../../hooks/useIsLoggedIn";
import { ResolvedCategory } from "../../types/Category";
import { UserContext } from "../../UserProvider/provider";
import { isAdmin } from "../../utils/flagResolve";
import { pushUser } from "../../utils/router";
import { routes } from "../../utils/routes";
import { Card } from "../Card";
import { FlexDiv } from "../Containers";
import { ProductsIcon, OrdersIcon, UserIcon, StoreIcon, PlusIcon } from "../Icons";
import { Text, PageTitle } from "../Text";
import { Layout } from "./Layout";
import { PageTitleContainer, PageSelectorButtons, PageSelectorButton, MainContent } from "./Styles";

type ManagementPageLayoutProps = {
  categories: ResolvedCategory[];
};

export const ManagementPageLayout: FC<ManagementPageLayoutProps> = ({ children, categories }) => {
  const router = useRouter();

  const isLoggedIn = useIsLoggedIn();

  const { state } = useContext(UserContext);

  if (typeof window == "undefined") return null;

  if (!isLoggedIn || !isAdmin(state.flags)) {
    pushUser(router, routes.home, "managementPageLayout not logged in or not admin");
  }

  if (!isLoggedIn) return null;

  return (
    <Layout categories={categories}>
      {isAdmin(state.flags) ? (
        <>
          <PageTitleContainer>
            <PageTitle>Management</PageTitle>
          </PageTitleContainer>

          <Card shadowFar>
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

                <PageSelectorButton
                  route={routes.managementStores}
                  active={window.location.pathname.includes("stores")}
                >
                  <StoreIcon /> <Text>Stores</Text>
                </PageSelectorButton>
              </PageSelectorButtons>

              <MainContent>{children}</MainContent>
            </FlexDiv>
          </Card>
        </>
      ) : null}
    </Layout>
  );
};
