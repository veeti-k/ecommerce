import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  AddCategoryFormSchema,
  addCategoryFormSchema,
} from "@ecommerce/shared";
import { Button, Dialog, FlexDiv, H3, Input, Select } from "@ecommerce/ui";

import { trpc } from "~utils/trpc";

export const AddCategory = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog
        title={<H3>Add a category</H3>}
        trigger={<Button>New</Button>}
        open={open}
        onOpenChange={setOpen}
      >
        <Form setOpen={setOpen} />
      </Dialog>
    </>
  );
};

interface FormProps {
  setOpen: (open: boolean) => void;
}

export const Form = ({ setOpen }: FormProps) => {
  const utils = trpc.useContext();
  const mutation = trpc.useMutation("categories.add", {
    onSuccess: () => utils.invalidateQueries(["categories.get-with-query-db"]),
  });

  const { reset, handleSubmit, register, formState } =
    useForm<AddCategoryFormSchema>({
      resolver: zodResolver(addCategoryFormSchema),
    });

  const onSubmit = async (values: AddCategoryFormSchema) => {
    await toast.promise(mutation.mutateAsync(values), {
      success: "Category added",
      loading: "Adding category",
      error: "Error adding category",
    });

    reset();
    setOpen(false);
  };

  const { data: categories } = trpc.useQuery(["categories.get-all-db"]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FlexDiv column style={{ paddingBottom: "1rem" }}>
        <Input
          label="Name"
          error={formState.errors.name?.message}
          {...register("name")}
        />

        <Select
          label="Parent"
          error={formState.errors.parentId?.message}
          {...register("parentId")}
        >
          <option value="" disabled hidden>
            Select a category
          </option>

          <option value="">None</option>

          {categories?.map((category, i) => (
            <option value={category.id} key={i}>
              {category.name}
            </option>
          ))}
        </Select>
      </FlexDiv>

      <FlexDiv justifyEnd>
        <Button type="submit" disabled={formState.isSubmitting}>
          {formState.isSubmitting ? "Adding..." : "Add"}
        </Button>
      </FlexDiv>
    </form>
  );
};
