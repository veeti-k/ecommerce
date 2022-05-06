import { useDisclosure, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC } from "react";
import toast from "react-hot-toast";
import { ProductPageProduct } from "../../../types/Product";
import { DeleteProductRequest } from "../../../utils/Requests/Product";
import { pushUser } from "../../../utils/router";
import { routes } from "../../../utils/routes";
import { TrashIcon } from "../../Icons";
import { AlertDialog } from "../AlertDialog";

type Props = {
  product: ProductPageProduct;
};

export const DeleteProductDialog: FC<Props> = ({ product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const onSubmit = async () => {
    const notifId = toast.loading("Deleting the product");

    const res = await DeleteProductRequest(product.productId);

    toast.dismiss(notifId);

    if (res) {
      toast.success("Product deleted");
      onClose();
      pushUser(router, routes.home, "Product deleted::after submit");
    }
  };

  return (
    <>
      <Button colorScheme="red" onClick={onOpen} leftIcon={<TrashIcon />}>
        Delete
      </Button>

      <AlertDialog
        header="Delete product"
        bodyText={`Are you sure you want to delete the product ${product.name}?`}
        submitLabel="Yes, delete product"
        onSubmit={onSubmit}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};