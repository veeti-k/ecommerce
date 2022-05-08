import { useDisclosure, IconButton, Tooltip } from "@chakra-ui/react";
import { FC } from "react";
import toast from "react-hot-toast";
import { Category } from "../../../types/Category";
import { AddCategoryRequest } from "../../../utils/Requests/Category";
import { NewCategoryForm } from "../../Forms/dialogs/NewCategoryForm";
import { PlusIcon } from "../../Icons";
import { Dialog2, DialogBody, DialogHeader } from "../Dialog";

type Props = {
  getCategories: () => void;
  categories: Category[];
};

export const AddCategoryDialog: FC<Props> = ({ getCategories, categories }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = (values: any) =>
    toast.promise(
      (async () => {
        const res = await AddCategoryRequest(values);
        if (!res) throw 1;

        getCategories();
        onClose();
      })(),
      {
        loading: "Adding category",
        success: "Category added!",
        error: "Failed to add category",
      }
    );

  return (
    <>
      <Tooltip label="Add a category">
        <IconButton
          aria-label="Add a category"
          size="sm"
          colorScheme="blue"
          onClick={onOpen}
          icon={<PlusIcon />}
        />
      </Tooltip>

      <Dialog2 isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
        <DialogHeader>Add a category</DialogHeader>

        <DialogBody>
          <NewCategoryForm categories={categories} onSubmit={onSubmit} />
        </DialogBody>
      </Dialog2>
    </>
  );
};
