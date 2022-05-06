import { Button, Select } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../UserProvider/provider";
import { logout } from "../../../utils/logout";
import { pushUser } from "../../../utils/router";
import { routes } from "../../../utils/routes";
import { FlexDiv } from "../../Containers";
import { LogoutIcon } from "../../Icons";
import { PageTitle } from "../../Text";
import { PageTitleContainer } from "../Styles";

export const SettingsPageLayoutMobile = () => {
  const router = useRouter();

  const [selectValue, setSelectValue] = useState<string>("");
  const { dispatch } = useContext(UserContext);

  const onSelectChange = (goto: string) => {
    setSelectValue(goto);

    pushUser(router, goto, "settings select change");
  };

  useEffect(() => {
    setSelectValue(window.location.pathname.split("/").pop()!);
  }, []);

  return (
    <PageTitleContainer test>
      <FlexDiv spaceBetween align>
        <PageTitle>Account settings</PageTitle>

        <Button
          colorScheme="red"
          size="sm"
          style={{ boxShadow: "2px 4px 12px rgb(0 0 0 / 8%)" }}
          onClick={() => logout(router, dispatch, routes.home)}
          leftIcon={<LogoutIcon />}
        >
          Log out
        </Button>
      </FlexDiv>

      <Select
        size="sm"
        backgroundColor="white"
        onChange={(e) => onSelectChange(e.target.value)}
        value={selectValue}
      >
        <option value="account">Account</option>
        <option value="password">Password</option>
        <option value="addresses">Addresses</option>
        <option value="sessions">Sessions</option>
      </Select>
    </PageTitleContainer>
  );
};
