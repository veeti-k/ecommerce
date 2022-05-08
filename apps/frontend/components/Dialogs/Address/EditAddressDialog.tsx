import { IconButton, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useContext } from "react";
import { EditIcon } from "../../Icons";
import { toast } from "react-hot-toast";
import { UserContext } from "../../../UserProvider/provider";
import { EditAddressRequest } from "../../../utils/Requests/Address";
import { Address } from "../../../types/User";
import { Dialog2, DialogBody, DialogHeader } from "../Dialog";
import { GetMe } from "../../../utils/Requests/Account";
import { EditAddressForm } from "../../Forms/dialogs/EditAddressForm";

export const EditAddressDialog = ({ address }: { address: Address }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { dispatch } = useContext(UserContext);

  const onSubmit = async (values: any) =>
    toast.promise(
      (async () => {
        const res = await EditAddressRequest(address.addressId, values);
        if (!res) throw 1;

        GetMe(dispatch);
        onClose();
      })(),
      {
        loading: "Editing address",
        success: "Address edited!",
        error: "Failed to edit address",
      }
    );

  return (
    <>
      <Tooltip label="Edit address">
        <IconButton
          aria-label="Edit address"
          colorScheme="blue"
          size="sm"
          icon={<EditIcon />}
          onClick={onOpen}
        />
      </Tooltip>

      <Dialog2 isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
        <DialogHeader>Edit address</DialogHeader>

        <DialogBody>
          <EditAddressForm onSubmit={onSubmit} address={address} />
        </DialogBody>
      </Dialog2>
    </>
  );
};
