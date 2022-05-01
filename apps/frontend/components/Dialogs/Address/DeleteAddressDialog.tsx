import { IconButton, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Address } from "../../../types/User";
import { UserContext } from "../../../UserProvider/provider";
import { getMe } from "../../../utils/logout";
import { DeleteAddressRequest } from "../../../utils/Requests/Address";
import { TrashIcon } from "../../Icons";
import { AlertDialog } from "../AlertDialog";

export const DeleteAddressDialog = ({ address }: { address: Address }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { dispatch } = useContext(UserContext);

  const onSubmit = async () => {
    const notifId = toast.loading("Deleting address");

    const res = await DeleteAddressRequest(address.addressId);

    toast.dismiss(notifId);

    if (res) {
      toast.success("Address deleted");
      getMe(dispatch);
      onClose();
    }
  };

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
      />
    </>
  );
};
