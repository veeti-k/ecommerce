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

export const pluralize = (props: Props) => {
  const { singular, plural, count } = props;

  const pluralized = plural || `${singular}s`;

  const text = count === 1 ? singular : pluralized;

  let showCount = typeof props.showCount === "undefined" ? true : props.showCount;

  return `${showCount && count} ${text}`;
};
