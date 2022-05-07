import {
  AlertDialog as ChakraAlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { FC, useRef } from "react";
import { FlexDiv } from "../Containers";
import { Text } from "../Text";

type SharedProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  header: string;
  bodyText: string;
  submitLabel: string;
  submitColor?: string;
};

type Props =
  | (SharedProps & {
      submitBtnIsLoading: boolean;
      submitBtnLoadingText: string;
    })
  | (SharedProps & {
      submitBtnIsLoading?: never;
      submitBtnLoadingText?: never;
    });

export const AlertDialog: FC<Props> = (props) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <ChakraAlertDialog
      isOpen={props.isOpen}
      onClose={props.onClose}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader style={{ paddingBottom: 0 }}>{props.header}</AlertDialogHeader>
        <AlertDialogCloseButton />

        <AlertDialogBody>
          <Text>{props.bodyText}</Text>
        </AlertDialogBody>

        <AlertDialogFooter>
          <FlexDiv gap05>
            <Button onClick={props.onClose} ref={cancelRef}>
              Cancel
            </Button>

            <Button
              colorScheme={props.submitColor ? props.submitColor : "red"}
              type="submit"
              onClick={props.onSubmit}
              isLoading={props.submitBtnIsLoading}
              loadingText={props.submitBtnLoadingText}
            >
              {props.submitLabel}
            </Button>
          </FlexDiv>
        </AlertDialogFooter>
      </AlertDialogContent>
    </ChakraAlertDialog>
  );
};
