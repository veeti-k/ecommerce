import { FC } from "react";

type Props = {
  singular: string;
  plural?: string;
  count: number;
  showCount?: boolean;
};

export const Pluralize: FC<Props> = ({ singular, plural, count, ...rest }) => {
  const pluralized = plural || `${singular}s`;

  const text = count === 1 ? singular : pluralized;

  let showCount = typeof rest.showCount === "undefined" ? true : rest.showCount;

  return (
    <>
      {showCount && count} {text}
    </>
  );
};
