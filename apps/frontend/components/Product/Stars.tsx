import { Tooltip } from "@chakra-ui/react";
import { FC } from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { FlexDiv } from "../Containers";
import { pluralize } from "../Pluralize";

type Props =
  | {
      rating: number;
      size?: "sm" | "md" | "lg";
      showReviewsLabel?: never;
      reviewCount?: never;
    }
  | {
      rating: number;
      size?: "sm" | "md" | "lg";
      showReviewsLabel: boolean;
      reviewCount: number;
    };

export const Stars: FC<Props> = ({ rating, size, showReviewsLabel: showLabel, reviewCount }) => {
  let fullStars = Math.floor(rating);

  if (rating - fullStars >= 0.78) fullStars++;

  const halfStars = rating - fullStars >= 0.28 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  const sizeSm = size == "sm";
  const sizeMd = size == "md";
  const sizeLg = size == "lg";

  let starSize = 15;
  let gap = "0.3rem";

  if (sizeSm) starSize = 12;
  if (sizeMd) starSize = 15;
  if (sizeLg) starSize = 30;

  if (sizeSm) gap = "0.1rem";
  if (sizeMd) gap = "0.2rem";
  if (sizeLg) gap = "0.3rem";

  const _Stars = (
    <FlexDiv gap0 style={{ gap }}>
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
        label={
          reviewCount
            ? `Rating ${rating}/5 based on ${pluralize({
                singular: "review",
                count: reviewCount,
              })}`
            : "No reviews"
        }
      >
        {_Stars}
      </Tooltip>
    );

  return <Tooltip label={`Rating ${rating}/5`}>{_Stars}</Tooltip>;
};
