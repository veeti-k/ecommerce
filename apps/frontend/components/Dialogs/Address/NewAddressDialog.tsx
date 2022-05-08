import { IconButton, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useContext } from "react";
import { PlusIcon } from "../../Icons";
import { toast } from "react-hot-toast";
import { UserContext } from "../../../UserProvider/provider";
import { Dialog2, DialogBody, DialogHeader } from "../Dialog";
import { GetMe } from "../../../utils/Requests/Account";
import { NewAddressForm } from "../../Forms/NewAddressForm";
import { NewAddressRequest } from "../../../utils/Requests/Address";

export const NewAddressDialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { dispatch } = useContext(UserContext);

  const onSubmit = (values: any) =>
    toast.promise(
      (async () => {
        const res = await NewAddressRequest(values);
        if (!res) throw 1;

        GetMe(dispatch);
        onClose();
      })(),
      {
        loading: "Adding address",
        success: "Address added!",
        error: "Failed to add address",
      }
    );

  return (
    <>
      <Tooltip label="Add an address">
        <IconButton
          aria-label="Add an address"
          colorScheme="blue"
          size="sm"
          icon={<PlusIcon />}
          onClick={onOpen}
        />
      </Tooltip>

      <Dialog2 isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
        <DialogHeader>Add an address</DialogHeader>

        <DialogBody>
          <NewAddressForm onSubmit={onSubmit} />
        </DialogBody>
      </Dialog2>
    </>
  );
};
