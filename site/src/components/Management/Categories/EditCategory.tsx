import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  EditCategoryFormSchema,
  editCategoryFormSchema,
} from "@ecommerce/shared";
import { Button, Dialog, FlexDiv, H3, Input, Select } from "@ecommerce/ui";

import { inferQueryOutput, trpc } from "~utils/trpc";

interface Props {
  category: inferQueryOutput<"categories.get-all-db">[number];
}

export const EditCategory = ({ category }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      title={<H3>Edit category</H3>}
      trigger={<Button>Edit</Button>}
      open={open}
      onOpenChange={setOpen}
    >
      <Form setOpen={setOpen} category={category} />
    </Dialog>
  );
};

interface FormProps {
  category: inferQueryOutput<"categories.get-all-db">[number];
  setOpen: (open: boolean) => void;
}

const Form = ({ setOpen, category }: FormProps) => {
  const utils = trpc.useContext();
  const mutation = trpc.useMutation("categories.add", {
    onSuccess: () => utils.invalidateQueries(["categories.get-with-query-db"]),
  });

  const { data: categories } = trpc.useQuery(["categories.get-all-db"]);

  const { reset, handleSubmit, register, formState } =
    useForm<EditCategoryFormSchema>({
      resolver: zodResolver(editCategoryFormSchema),
      defaultValues: {
        name: category.name,
        parentId: category.parentId,
      },
    });

  const onSubmit = async (values: EditCategoryFormSchema) => {
    await toast.promise(mutation.mutateAsync(values), {
      success: "Category added",
      loading: "Adding category",
      error: "Error adding category",
    });

    reset();
    setOpen(false);
  };

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
          {formState.isSubmitting ? "Editing..." : "Edit"}
        </Button>
      </FlexDiv>
    </form>
  );
};
