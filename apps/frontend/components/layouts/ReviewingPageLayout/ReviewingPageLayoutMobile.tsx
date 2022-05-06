import { Select } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { pushUser } from "../../../utils/router";
import { PageTitle } from "../../Text";
import { PageTitleContainer } from "../Styles";

export const ReviewingPageLayoutMobile = () => {
  const router = useRouter();

  const [selectValue, setSelectValue] = useState<string>("");

  const onSelectChange = (goto: string) => {
    setSelectValue(goto);

    pushUser(router, goto, "reviewing select change");
  };

  useEffect(() => {
    setSelectValue(window.location.pathname.split("/").pop()!);
  }, []);

  return (
    <PageTitleContainer test>
      <PageTitle>Reviewing</PageTitle>

      <Select
        size="sm"
        backgroundColor="white"
        onChange={(e) => onSelectChange(e.target.value)}
        value={selectValue}
      >
        <option value="questions">Questions</option>
        <option value="reviews">Reviews</option>
      </Select>
    </PageTitleContainer>
  );
};
