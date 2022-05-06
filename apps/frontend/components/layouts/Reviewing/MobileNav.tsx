import { Select } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../UserProvider/provider";
import { Flags, hasFlag } from "../../../utils/flagResolve";
import { pushUser } from "../../../utils/router";

export const ReviewingMobileNav = () => {
  const router = useRouter();

  const [selectValue, setSelectValue] = useState<string>("");

  const { state } = useContext(UserContext);

  const onSelectChange = (goto: string) => {
    setSelectValue(goto);

    pushUser(router, goto, "reviewing select change");
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
      {hasFlag(state.flags, Flags.ManageQuestions) && <option value="questions">Questions</option>}
      {hasFlag(state.flags, Flags.ManageReviews) && <option value="reviews">Reviews</option>}
    </Select>
  );
};
