import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import {
  AddProductFormSchema,
  addProductFormDefaultValues,
  addProductFormSchema,
} from "@ecommerce/shared";
import { Button, FlexDiv, Input, TextArea } from "@ecommerce/ui";

import { CategorySelector } from "../../CategorySelector";

export const AddProductForm = () => {
  const {
    control,
    register,
    reset: resetForm,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addProductFormSchema),
    defaultValues: addProductFormDefaultValues,
  });

  const { fields: imageFields } = useFieldArray({
    control,
    name: "images",
  });

  const { fields: bulletFields } = useFieldArray({
    control,
    name: "bullets",
  });

  const onSubmit = (values: AddProductFormSchema) => {
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FlexDiv column>
        <Input
          label="Name"
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          label="(€) Price"
          error={errors.price?.message}
          {...register("price")}
        />

        <TextArea
          label="Description"
          error={errors.description?.message}
          {...register("description")}
        />

        <TextArea
          label="Short Description"
          error={errors.description?.message}
          {...register("shortDescription")}
        />

        <CategorySelector
          value={getValues().categoryId}
          setValue={(newValue) => setValue("categoryId", newValue)}
        />

        {imageFields.map((field, i) => (
          <Input key={field.id} {...register(`images.${i}.value`)} />
        ))}

        {bulletFields.map((field, i) => (
          <Input key={field.id} {...register(`bullets.${i}.value`)} />
        ))}
      </FlexDiv>

      <Button type="submit">Add product</Button>
    </form>
  );
};
