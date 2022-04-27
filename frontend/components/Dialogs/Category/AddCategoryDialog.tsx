import { useDisclosure, IconButton, Tooltip, Input, Select } from "@chakra-ui/react";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { Category } from "../../../types/Category";
import { AddCategoryRequest } from "../../../utils/Requests/Category";
import { FlexDiv, InputLabelContainer } from "../../Containers";
import { PlusIcon } from "../../Icons";
import { Dialog } from "../Dialog";

type Props = {
  getCategories: () => void;
  categories: Category[];
};

export const AddCategoryDialog: FC<Props> = ({ getCategories, categories }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryParentId, setCategoryParentId] = useState<number | null>(null);

  const onSubmit = async () => {
    const notifId = toast.loading("Creating the category...");

    const res = await AddCategoryRequest({ name: categoryName, parentId: categoryParentId });

    toast.dismiss(notifId);

    if (res) {
      getCategories();
      toast.success("Category created");
      setCategoryName("");
      setCategoryParentId(null);
      onClose();
    }
  };

  const submitDisabled = !categoryName;

  return (
    <>
      <Tooltip label="Add a category">
        <IconButton aria-label="Add a category" size="sm" colorScheme="blue" onClick={onOpen}>
          <PlusIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        header="Add a category"
        submitDisabled={submitDisabled}
        submitLabel="Add"
        onSubmit={onSubmit}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      >
        <FlexDiv column fullWidth>
          <InputLabelContainer id="category-name" label="Category name">
            <Input
              id="category-name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              autoComplete="off"
              required
            />
          </InputLabelContainer>

          <InputLabelContainer id="category-parent" label="Parent">
            <Select
              id="category-parent"
              value={categoryParentId?.toString()}
              onChange={(e) => setCategoryParentId(parseInt(e.target.value))}
              defaultValue=""
            >
              <option value="">None</option>
              {categories.map((category) => {
                const parent = categories.find((c) => c.categoryId == category.parentId);

                return (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.name} {parent ? `- (${parent.name})` : ""}
                  </option>
                );
              })}
            </Select>
          </InputLabelContainer>
        </FlexDiv>
      </Dialog>
    </>
  );
};
