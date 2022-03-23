import { Text, Button } from "@chakra-ui/react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "./AlertDialog";
import { FlexDiv } from "./Containers";

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
        <FlexDiv gap05 flexEnd>
          <AlertDialogCancel asChild>
            <Button colorScheme="gray">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button colorScheme="red">Yes, delete account</Button>
          </AlertDialogAction>
        </FlexDiv>
      </AlertDialogContent>
    </AlertDialog>
  );
};
