import { Select } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../UserProvider/provider";
import { Flags, hasFlag } from "../../../utils/flagResolve";
import { pushUser } from "../../../utils/router";

export const MgmtMobileNav = () => {
  const router = useRouter();

  const [selectValue, setSelectValue] = useState<string>("");

  const { state } = useContext(UserContext);

  const onSelectChange = (goto: string) => {
    setSelectValue(goto);

    pushUser(router, goto, "management select change");
  };

  useEffect(() => {
    setSelectValue(window.location.pathname.split("/").pop()!);
  }, []);

  return (
    <Select
      size="sm"
      backgroundColor="white"
      onChange={(e) => onSelectChange(e.target.value)}
      value={selectValue}
    >
      {hasFlag(state.flags, Flags.ManageProducts) && (
        <option value="add/product">Add a product</option>
      )}
      {hasFlag(state.flags, Flags.ManageCategories) && (
        <option value="categories">Categories</option>
      )}
      <option value="orders">Orders</option>
      {hasFlag(state.flags, Flags.ManageUsers) && <option value="users">Users</option>}
    </Select>
  );
};
