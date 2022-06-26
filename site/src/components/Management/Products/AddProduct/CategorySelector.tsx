import { Option, Select } from "@ecommerce/ui";

import { trpc } from "~utils/trpc";

interface Props {
  value: number;
  setValue: (newValue: number) => void;
}

export const CategorySelector = ({ value, setValue }: Props) => {
  const {
    data: categories,
    isLoading,
    error,
  } = trpc.useQuery(["categories.get-all"]);

  if (isLoading)
    return (
      <Select label="Category">
        <Option value="">Loading...</Option>
      </Select>
    );

  if (error)
    return (
      <Select label="Category">
        <Option value="">Error getting categories</Option>
      </Select>
    );

  if (!categories || !categories.length)
    return (
      <Select label="Category">
        <Option value="">No categories</Option>
      </Select>
    );

  return (
    <Select
      label="Category"
      value={String(value)}
      onValueChange={(newValue) => setValue(Number(newValue))}
    >
      {categories.map((category, i) => (
        <Option value={String(category.id)} key={i}>
          {category.name}
        </Option>
      ))}
    </Select>
  );
};
