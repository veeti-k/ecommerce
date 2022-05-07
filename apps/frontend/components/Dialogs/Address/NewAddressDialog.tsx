import { IconButton, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useContext } from "react";
import { PlusIcon } from "../../Icons";
import { request } from "../../../utils/requests";
import { apiRoutes } from "../../../utils/routes";
import { toast } from "react-hot-toast";
import { UserContext } from "../../../UserProvider/provider";
import { Dialog2, DialogBody, DialogHeader } from "../Dialog";
import { GetMe } from "../../../utils/Requests/Account";
import { NewAddressForm } from "../../Forms/NewAddressForm";

export const NewAddressDialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { dispatch } = useContext(UserContext);

  const onSubmit = async (values: any) => {
    const res = await request({
      method: "POST",
      path: apiRoutes.user.addressesRoot("me"),
      body: values,
    });

    if (res) {
      toast.success("Address added!");
      GetMe(dispatch);
      onClose();
    }
  };

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
