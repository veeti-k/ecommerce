import { Text, Button } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
} from "@radix-ui/react-alert-dialog";
import { AlertDialogContent } from "./AlertDialog";
import { FlexRow } from "./Containers";

export const DeleteAccountDialog = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button colorScheme="red" variant="link">
          Delete account
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <Text fontSize="2xl" fontWeight="bold">
          Delete account?
        </Text>
        <Text>This action can&#39;t be undone. Your account will be permanently deleted.</Text>
        <FlexRow gap05 flexEnd>
          <AlertDialogCancel asChild>
            <Button colorScheme="gray">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button colorScheme="red">Yes, delete account</Button>
          </AlertDialogAction>
        </FlexRow>
      </AlertDialogContent>
    </AlertDialog>
  );
};
