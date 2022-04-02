import { Button } from "@chakra-ui/react";
import { PlusIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import { FC, useContext } from "react";
import { useIsLoggedIn } from "../../hooks/useIsLoggedIn";
import { styled } from "../../stitches.config";
import { UserContext } from "../../UserProvider/provider";
import { isAdmin } from "../../utils/flagResolve";
import { pushUser } from "../../utils/router";
import { routes } from "../../utils/routes";
import { FlexDiv } from "../Containers";
import { ProductsIcon, OrdersIcon, UserIcon } from "../Icons";
import { BiggerParagraph, BigHeading } from "../Text";
import { Layout } from "./Layout";
import { PageTitleContainer, PageSelectorButtons, PageSelectorButton } from "./Styles";

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
  const router = useRouter();

  const isLoggedIn = useIsLoggedIn();

  const { state } = useContext(UserContext);

  if (typeof window == "undefined") return null;

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
                    <PlusIcon />{" "}
                    <BiggerParagraph style={{ color: "black" }}>Add a product</BiggerParagraph>
                  </FlexDiv>
                </Button>
                <PageSelectorButton
                  route={routes.managementCategories}
                  active={window.location.pathname.includes("categories")}
                >
                  <ProductsIcon />{" "}
                  <BiggerParagraph style={{ color: "black" }}>Categories</BiggerParagraph>
                </PageSelectorButton>
                <PageSelectorButton
                  route={routes.managementOrders}
                  active={window.location.pathname.includes("orders")}
                >
                  <OrdersIcon />{" "}
                  <BiggerParagraph style={{ color: "black" }}>Orders</BiggerParagraph>
                </PageSelectorButton>
                <PageSelectorButton
                  route={routes.managementUsers}
                  active={window.location.pathname.includes("users")}
                >
                  <UserIcon size={20} />{" "}
                  <BiggerParagraph style={{ color: "black" }}>Users</BiggerParagraph>
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
