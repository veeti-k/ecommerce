import {
  useDisclosure,
  Tooltip,
  IconButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import { TrashIcon } from "@radix-ui/react-icons";
import { useRef, FormEvent, FC } from "react";
import toast from "react-hot-toast";
import { Category } from "../../../types";
import { DeleteCategoryRequest } from "../../../utils/Requests/Category";
import { FlexDiv } from "../../Containers";
import { Text } from "../../Text";

type Props = {
  category: Category;
  getCategories: () => void;
};

export const DeleteCategoryModal: FC<Props> = ({ category, getCategories }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

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
          onClick={onOpen}
        />
      </Tooltip>

      <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Delete a category</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Text>
              Are you sure you want to delete the category <strong>{category.name}</strong>?
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <FlexDiv gap05>
              <Button onClick={onClose} ref={cancelRef}>
                Cancel
              </Button>
              <Button type="submit" onClick={onSubmit} colorScheme="red">
                Delete
              </Button>
            </FlexDiv>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
