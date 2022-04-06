import {
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import { useRef, FormEvent, FC } from "react";
import toast from "react-hot-toast";
import { ProductPageProduct } from "../../../types";
import { DeleteProductRequest } from "../../../utils/Requests/Product";
import { FlexDiv } from "../../Containers";
import { TrashIcon } from "../../Icons";
import { Text } from "../../Text";

type Props = {
  product: ProductPageProduct;
};

export const DeleteProductModal: FC<Props> = ({ product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const notifId = toast.loading("Deleting the product");

    const res = await DeleteProductRequest(product.id);

    toast.dismiss(notifId);

    if (res) {
      toast.success("Product deleted");
      onClose();
    }
  };

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        <FlexDiv align gap05>
          <TrashIcon /> Delete
        </FlexDiv>
      </Button>

      <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Delete a product</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Text>
              Are you sure you want to delete the product <strong>{product.name}</strong>?
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
