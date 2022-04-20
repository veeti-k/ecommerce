import { useDisclosure, Tooltip, IconButton, Input, Select } from "@chakra-ui/react";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { Category } from "../../../types/Category";
import { EditCategoryRequest } from "../../../utils/Requests/Category";
import { FlexDiv, InputLabelContainer } from "../../Containers";
import { EditIcon } from "../../Icons";
import { Dialog } from "../Dialog";

type Props = {
  category: Category;
  getCategories: () => void;
  categories: Category[];
};

export const EditCategoryDialog: FC<Props> = ({ getCategories, categories, category }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [categoryName, setCategoryName] = useState<string>(category.name);
  const [categoryParentId, setCategoryParentId] = useState<number | null>(category.parentId);

  const onSubmit = async () => {
    const notifId = toast.loading("Saving your edits");

    const res = await EditCategoryRequest(category.id, {
      name: categoryName,
      parentId: categoryParentId,
    });

    toast.dismiss(notifId);

    if (res) {
      getCategories();
      toast.success("Category edited");
      onClose();
    }
  };

  return (
    <>
      <Tooltip label="Edit category">
        <IconButton aria-label="Edit category" icon={<EditIcon />} size="sm" onClick={onOpen} />
      </Tooltip>

      <Dialog
        header="Edit category"
        submitLabel="Update"
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        onSubmit={onSubmit}
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
              required
            >
              <option value="">None</option>
              {categories.map((optionCategory) => {
                const parent = categories.find((c) => c.id == optionCategory.parentId);

                return (
                  <option
                    key={optionCategory.id}
                    value={optionCategory.id}
                    disabled={optionCategory.id == category.id}
                  >
                    {optionCategory.name} {parent ? `(${parent.name})` : ""}
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
