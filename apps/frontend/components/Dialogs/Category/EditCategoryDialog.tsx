import { useDisclosure, Tooltip, IconButton } from "@chakra-ui/react";
import { FC } from "react";
import toast from "react-hot-toast";
import { Category } from "../../../types/Category";
import { EditCategoryRequest } from "../../../utils/Requests/Category";
import { EditCategoryForm } from "../../Forms/dialogs/EditCategoryForm";
import { EditIcon } from "../../Icons";
import { Dialog2, DialogBody, DialogHeader } from "../Dialog";

type Props = {
  category: Category;
  getCategories: () => void;
  categories: Category[];
};

export const EditCategoryDialog: FC<Props> = ({ getCategories, categories, category }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = (values: any) =>
    toast.promise(
      (async () => {
        const res = await EditCategoryRequest(category.categoryId, {
          name: values.name,
          parentId: values.parentId.length ? values.parentId : null,
        });
        if (!res) throw 1;

        getCategories();
        onClose();
      })(),
      {
        loading: "Editing category",
        success: "Category edited!",
        error: "Failed to edit category",
      }
    );

  return (
    <>
      <Tooltip label="Edit category">
        <IconButton aria-label="Edit category" icon={<EditIcon />} size="sm" onClick={onOpen} />
      </Tooltip>

      <Dialog2 onClose={onClose} onOpen={onOpen} isOpen={isOpen}>
        <DialogHeader>Edit category</DialogHeader>

        <DialogBody>
          <EditCategoryForm category={category} categories={categories} onSubmit={onSubmit} />
        </DialogBody>
      </Dialog2>
    </>
  );
};
