import { Button } from "@chakra-ui/react";
import { PlusIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import { FC, useContext } from "react";
import { useGetMe } from "../../hooks/useGetMe";
import { useIsLoggedIn } from "../../hooks/useIsLoggedIn";
import { styled } from "../../stitches.config";
import { UserContext } from "../../UserProvider/provider";
import { isAdmin } from "../../utils/flagResolve";
import { pushUser } from "../../utils/router";
import { routes } from "../../utils/routes";
import {
  FlexDiv,
  PageSelectorButton,
  PageSelectorButtons,
  PageTitleContainer,
} from "../Containers";
import { ProductsIcon, OrdersIcon, UserIcon } from "../Icons";
import { BigHeading, Paragraph } from "../Text";
import { Layout } from "./Layout";

const ManagementPageCard = styled("div", {
  display: "flex",
  flexDirection: "column",
  borderRadius: "8px",

  boxShadow: "$shadowFar",
});

const MainContent = styled("div", {
  backgroundColor: "#fcfcfc",
  display: "flex",
  width: "100%",
  padding: "1.5rem 2rem",

  borderTopRightRadius: "8px",
  borderBottomRightRadius: "8px",

  flexDirection: "column",
});

export const ManagementPageLayout: FC = ({ children }) => {
  if (typeof window == "undefined") return null;
  const router = useRouter();

  const isLoggedIn = useIsLoggedIn();
  useGetMe();

  const { state } = useContext(UserContext);

  return (
    <Layout>
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
                  <FlexDiv align justify gap05>
                    <PlusIcon /> <Paragraph style={{ color: "black" }}>Add a product</Paragraph>
                  </FlexDiv>
                </Button>
                <PageSelectorButton
                  route={routes.managementCategories}
                  active={window.location.pathname.includes("categories")}
                >
                  <ProductsIcon /> <Paragraph style={{ color: "black" }}>Categories</Paragraph>
                </PageSelectorButton>
                <PageSelectorButton
                  route={routes.managementOrders}
                  active={window.location.pathname.includes("orders")}
                >
                  <OrdersIcon /> <Paragraph style={{ color: "black" }}>Orders</Paragraph>
                </PageSelectorButton>
                <PageSelectorButton
                  route={routes.managementUsers}
                  active={window.location.pathname.includes("users")}
                >
                  <UserIcon size={20} /> <Paragraph style={{ color: "black" }}>Users</Paragraph>
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
