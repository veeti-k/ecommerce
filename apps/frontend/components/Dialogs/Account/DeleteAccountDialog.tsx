import { Button, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { DeleteAccountRequest } from "../../../utils/Requests/Account";
import { pushUser } from "../../../utils/router";
import { routes } from "../../../utils/routes";
import { FlexDiv } from "../../Containers";
import { AlertDialog } from "../AlertDialog";

export const DeleteAccountDialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const onSubmit = async () =>
    toast.promise(
      (async () => {
        const res = await DeleteAccountRequest();
        if (!res) throw 1;

        onClose();
        pushUser(router, routes.home, "Account deleted::after submit");
      })(),
      {
        loading: "Deleting account",
        success: "Account deleted!",
        error: "Failed to delete account",
      }
    );
  return (
    <>
      <Button colorScheme="red" variant="link" onClick={onOpen}>
        <FlexDiv align gap05>
          Delete account
        </FlexDiv>
      </Button>

      <AlertDialog
        header="Delete account"
        bodyText={`Are you sure? This action can't be undone. Your account will be permanently deleted.`}
        submitLabel="Yes, delete account"
        onSubmit={onSubmit}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};
