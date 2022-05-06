import { Select } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { pushUser } from "../../../utils/router";

export const SettingsMobileNav = () => {
  const router = useRouter();

  const [selectValue, setSelectValue] = useState<string>("");

  const onSelectChange = (goto: string) => {
    setSelectValue(goto);

    pushUser(router, goto, "settings select change");
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
      <option value="account">Account</option>
      <option value="password">Password</option>
      <option value="addresses">Addresses</option>
      <option value="sessions">Sessions</option>
    </Select>
  );
};
