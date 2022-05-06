import { useContext } from "react";
import { UserContext } from "../../../UserProvider/provider";
import { Flags, hasFlag } from "../../../utils/flagResolve";
import { routes } from "../../../utils/routes";
import { FlexDiv } from "../../Containers";
import { QuestionIcon, ReviewIcon } from "../../Icons";
import { Text } from "../../Text";
import { PageSelectorButtons, PageSelectorButton } from "../Styles";

export const ReviewingNav = () => {
  const { state } = useContext(UserContext);

  return (
    <PageSelectorButtons>
      {hasFlag(state.flags, Flags.ManageReviews) && (
        <PageSelectorButton
          route={routes.managementReviewingReviews}
          active={window.location.pathname.includes("reviews")}
        >
          <FlexDiv gap05>
            <ReviewIcon /> <Text>Reviews</Text>
          </FlexDiv>
        </PageSelectorButton>
      )}

      {hasFlag(state.flags, Flags.ManageQuestions) && (
        <PageSelectorButton
          route={routes.managementReviewingQuestions}
          active={window.location.pathname.includes("questions")}
        >
          <FlexDiv gap05>
            <QuestionIcon /> <Text>Questions</Text>
          </FlexDiv>
        </PageSelectorButton>
      )}
    </PageSelectorButtons>
  );
};
