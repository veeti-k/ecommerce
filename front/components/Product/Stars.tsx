import { Tooltip } from "@chakra-ui/react";
import { FC } from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { FlexDiv } from "../Containers";

type Props =
  | {
      rating: number;
      bigger?: boolean;
      showReviewsLabel?: never;
      reviewCount?: never;
    }
  | {
      rating: number;
      bigger?: boolean;
      showReviewsLabel: boolean;
      reviewCount: number;
    };

export const Stars: FC<Props> = ({ rating, bigger, showReviewsLabel: showLabel, reviewCount }) => {
  let fullStars = Math.floor(rating);

  if (rating - fullStars >= 0.78) fullStars++;

  const halfStars = rating - fullStars >= 0.28 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  const starSize = bigger ? 30 : 0;

  const _Stars = (
    <FlexDiv gap0 style={{ gap: "0.3rem" }}>
      {[...Array(fullStars)].map((_, i) => (
        <BsStarFill key={i} size={starSize} />
      ))}
      {[...Array(halfStars)].map((_, i) => (
        <BsStarHalf key={i} size={starSize} />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <BsStar key={i} size={starSize} />
      ))}
    </FlexDiv>
  );

  if (showLabel && typeof reviewCount === "number")
    return (
      <Tooltip
        label={reviewCount ? `Rating ${rating}/5 based on ${reviewCount} reviews` : "No reviews"}
      >
        {_Stars}
      </Tooltip>
    );

  return <Tooltip label={`Rating ${rating}/5`}>{_Stars}</Tooltip>;
};
