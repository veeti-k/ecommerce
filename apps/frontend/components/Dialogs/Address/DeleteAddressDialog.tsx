import { IconButton, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Address } from "../../../types/User";
import { UserContext } from "../../../UserProvider/provider";
import { GetMe } from "../../../utils/Requests/Account";
import { DeleteAddressRequest } from "../../../utils/Requests/Address";
import { TrashIcon } from "../../Icons";
import { AlertDialog } from "../AlertDialog";

export const DeleteAddressDialog = ({ address }: { address: Address }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { dispatch } = useContext(UserContext);
  const [deleting, setDeleting] = useState(false);

  const onSubmit = async () =>
    toast.promise(
      (async () => {
        setDeleting(true);
        const res = await DeleteAddressRequest(address.addressId);
        setDeleting(false);

        if (res) {
          GetMe(dispatch);
          onClose();
        }
      })(),
      {
        loading: "Deleting address",
        success: "Address deleted!",
        error: "Error deleting address",
      }
    );

  return (
    <>
      <Tooltip label="Delete address">
        <IconButton
          aria-label="Delete address"
          colorScheme="red"
          size="sm"
          icon={<TrashIcon />}
          onClick={onOpen}
        />
      </Tooltip>

      <AlertDialog
        header="Delete address"
        bodyText={`Are you sure?`}
        submitLabel="Delete"
        onSubmit={onSubmit}
        isOpen={isOpen}
        onClose={onClose}
        submitBtnIsLoading={deleting}
        submitBtnLoadingText="Deleting"
      />
    </>
  );
};
