import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../../../UserProvider/provider";
import { Flags, hasFlag } from "../../../utils/flagResolve";
import { pushUser } from "../../../utils/router";
import { routes } from "../../../utils/routes";
import { FlexDiv } from "../../Containers";
import { PlusIcon, ProductsIcon, OrdersIcon, UserIcon } from "../../Icons";
import { Text } from "../../Text";
import { PageSelectorButtons, PageSelectorButton } from "../Styles";

export const MgmtNav = () => {
  const { state } = useContext(UserContext);
  const router = useRouter();

  return (
    <PageSelectorButtons>
      {hasFlag(state.flags, Flags.ManageProducts) && (
        <Button
          onClick={() =>
            pushUser(router, routes.managementAddProduct, "pageSelectorButton::onClick")
          }
          style={{ marginBottom: "0.5rem" }}
        >
          <FlexDiv gap05>
            <PlusIcon /> <Text>Add a product</Text>
          </FlexDiv>
        </Button>
      )}

      {hasFlag(state.flags, Flags.ManageCategories) && (
        <PageSelectorButton
          route={routes.managementCategories}
          active={window.location.pathname.includes("categories")}
        >
          <ProductsIcon /> <Text>Categories</Text>
        </PageSelectorButton>
      )}

      <PageSelectorButton
        route={routes.managementOrders}
        active={window.location.pathname.includes("orders")}
      >
        <OrdersIcon /> <Text>Orders</Text>
      </PageSelectorButton>

      {hasFlag(state.flags, Flags.ManageUsers) && (
        <PageSelectorButton
          route={routes.managementUsers}
          active={window.location.pathname.includes("users")}
        >
          <UserIcon /> <Text>Users</Text>
        </PageSelectorButton>
      )}
    </PageSelectorButtons>
  );
};
