import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { FlexDiv } from "../Containers";

export const Stars = ({ rating, bigger }: { rating: number; bigger?: boolean }) => {
  let fullStars = Math.floor(rating);

  if (rating - fullStars >= 0.78) fullStars++;

  const halfStars = rating - fullStars >= 0.28 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  const starSize = bigger ? 30 : 0;

  return (
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
};
