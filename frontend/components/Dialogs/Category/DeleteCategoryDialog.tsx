import { useDisclosure, Tooltip, IconButton } from "@chakra-ui/react";
import { FC } from "react";
import toast from "react-hot-toast";
import { Category } from "../../../types/Category";
import { DeleteCategoryRequest } from "../../../utils/Requests/Category";
import { TrashIcon } from "../../Icons";
import { AlertDialog } from "../AlertDialog";

type Props = {
  category: Category;
  getCategories: () => void;
};

export const DeleteCategoryDialog: FC<Props> = ({ category, getCategories }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = async () => {
    const notifId = toast.loading("Deleting the category");

    const res = await DeleteCategoryRequest(category.id);

    toast.dismiss(notifId);

    if (res) {
      getCategories();
      toast.success("Category deleted");
      onClose();
    }
  };

  return (
    <>
      <Tooltip label="Delete category">
        <IconButton
          aria-label="Delete category"
          icon={<TrashIcon />}
          colorScheme="red"
          size="sm"
          onClick={onOpen}
        />
      </Tooltip>

      <AlertDialog
        header="Delete category"
        bodyText={`Are you sure you want to delete the category ${category.name}?`}
        submitLabel="Delete"
        onSubmit={onSubmit}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};
