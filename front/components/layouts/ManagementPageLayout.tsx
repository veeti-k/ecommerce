import { Button } from "@chakra-ui/react";
import { PlusIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import { FC, useContext } from "react";
import { useIsLoggedIn } from "../../hooks/useIsLoggedIn";
import { styled } from "../../stitches.config";
import { ResolvedCategory } from "../../types";
import { UserContext } from "../../UserProvider/provider";
import { isAdmin } from "../../utils/flagResolve";
import { pushUser } from "../../utils/router";
import { routes } from "../../utils/routes";
import { FlexDiv } from "../Containers";
import { ProductsIcon, OrdersIcon, UserIcon } from "../Icons";
import { Text, BigHeading } from "../Text";
import { Layout } from "./Layout";
import { PageTitleContainer, PageSelectorButtons, PageSelectorButton, MainContent } from "./Styles";

const ManagementPageCard = styled("div", {
  display: "flex",
  flexDirection: "column",
  borderRadius: "8px",

  boxShadow: "$shadowFar",
});

type ManagementPageLayoutProps = {
  categories: ResolvedCategory[];
};

export const ManagementPageLayout: FC<ManagementPageLayoutProps> = ({ children, categories }) => {
  const router = useRouter();

  const isLoggedIn = useIsLoggedIn();

  const { state } = useContext(UserContext);

  if (typeof window == "undefined") return null;

  return (
    <Layout categories={categories}>
      {isLoggedIn && isAdmin(state.flags) ? (
        <>
          <PageTitleContainer>
            <BigHeading>Management</BigHeading>
          </PageTitleContainer>

          <ManagementPageCard>
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
                  <UserIcon size={20} /> <Text>Users</Text>
                </PageSelectorButton>
              </PageSelectorButtons>

              <MainContent>{children}</MainContent>
            </FlexDiv>
          </ManagementPageCard>
        </>
      ) : null}
    </Layout>
  );
};