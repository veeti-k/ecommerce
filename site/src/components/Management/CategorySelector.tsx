import * as React from "react";

import { Select } from "@ecommerce/ui";

import { trpc } from "~utils/trpc";

interface Props {
  label: string;
  required?: boolean;
  error?: string;
}

export const CategorySelector = React.forwardRef<HTMLSelectElement, Props>(
  ({ label, required, error }, ref) => {
    const {
      data: categories,
      isLoading,
      error: categoryError,
    } = trpc.useQuery(["categories.get-all"]);

    if (isLoading)
      return (
        <Select label={label} required={required}>
          <option value="">Loading...</option>
        </Select>
      );

    if (categoryError)
      return (
        <Select label={label} required={required}>
          <option value="">Error getting categories</option>
        </Select>
      );

    const isCategories = !categories || !categories.length;

    if (isCategories)
      return (
        <Select label={label} required={required}>
          <option value="">No categories</option>
        </Select>
      );

    return (
      <Select
        label={label}
        error={error}
        required={required}
        defaultValue=""
        ref={ref}
      >
        <option value="" disabled hidden>
          Select a category
        </option>

        <option value="">None</option>

        {categories.map((category, i) => (
          <option value={category.id} key={i}>
            {category.name}
          </option>
        ))}
      </Select>
    );
  }
);
