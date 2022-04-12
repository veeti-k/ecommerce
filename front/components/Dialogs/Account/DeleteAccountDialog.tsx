import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FormEvent, useRef } from "react";
import toast from "react-hot-toast";
import { DeleteAccountRequest } from "../../../utils/Requests/Account";
import { pushUser } from "../../../utils/router";
import { routes } from "../../../utils/routes";
import { FlexDiv } from "../../Containers";
import { Text } from "../../Text";

export const DeleteAccountDialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const notifId = toast.loading("Deleting account");

    const res = await DeleteAccountRequest();

    toast.dismiss(notifId);

    if (res) {
      toast.success("Account deleted");
      onClose();
      pushUser(router, routes.home, "Account deleted::after submit");
    }
  };

  return (
    <>
      <Button colorScheme="red" variant="link" onClick={onOpen}>
        <FlexDiv align gap05>
          Delete account
        </FlexDiv>
      </Button>

      <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader style={{ padding: "1rem 1.5rem 0 1.5rem" }}>
              Delete account
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text>
                Are you sure? This action can&#39;t be undone. Your account will be permanently
                deleted.
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <FlexDiv gap05>
                <Button onClick={onClose} ref={cancelRef}>
                  Cancel
                </Button>
                <Button type="submit" colorScheme="red" onClick={onSubmit}>
                  Yes, delete account
                </Button>
              </FlexDiv>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
