import { IconButton, Tooltip, useDisclosure } from "@chakra-ui/react";
import { FC } from "react";
import toast from "react-hot-toast";
import { Store } from "../../../types/Store";
import { DeleteStoreRequest } from "../../../utils/Requests/Store";
import { TrashIcon } from "../../Icons";
import { AlertDialog } from "../AlertDialog";

type Props = {
  store: Store;
  getStores: () => void;
};

export const DeleteStoreDialog: FC<Props> = ({ store, getStores }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = async () => {
    const notifId = toast.loading("Deleting store");

    const res = await DeleteStoreRequest(store.id);

    toast.dismiss(notifId);

    if (res) {
      getStores();
      toast.success("Store deleted");
      onClose();
    }
  };

  return (
    <>
      <Tooltip label="Delete store">
        <IconButton
          colorScheme="red"
          size="sm"
          aria-label="Delete store"
          icon={<TrashIcon />}
          onClick={onOpen}
        />
      </Tooltip>

      <AlertDialog
        bodyText={`Are you sure you want to delete the store ${store.name}?`}
        header="Delete store"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        submitLabel="Yes, delete store"
      />
    </>
  );
};
