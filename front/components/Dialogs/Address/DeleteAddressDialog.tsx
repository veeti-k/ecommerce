import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { FormEvent, useContext, useRef } from "react";
import toast from "react-hot-toast";
import { Address } from "../../../types";
import { UserContext } from "../../../UserProvider/provider";
import { getMe } from "../../../utils/logout";
import { DeleteAddressRequest } from "../../../utils/Requests/Address";
import { FlexDiv } from "../../Containers";
import { TrashIcon } from "../../Icons";
import { Text } from "../../Text";

export const DeleteAddressDialog = ({ address }: { address: Address }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { dispatch } = useContext(UserContext);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const notifId = toast.loading("Deleting address");

    const res = await DeleteAddressRequest(address.id);

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
        <IconButton aria-label="Delete address" colorScheme="red" size="sm" onClick={onOpen}>
          <TrashIcon />
        </IconButton>
      </Tooltip>

      <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader style={{ padding: "1rem 1.5rem 0 1.5rem" }}>
              Delete address
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text>Are you sure?</Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <FlexDiv gap05>
                <Button onClick={onClose} ref={cancelRef}>
                  Cancel
                </Button>
                <Button type="submit" colorScheme="red" onClick={onSubmit}>
                  Yes, delete address
                </Button>
              </FlexDiv>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
