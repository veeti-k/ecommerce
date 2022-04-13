import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { FlexDiv } from "../Containers";

type DialogProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;

  children: ReactNode;

  header: string;

  submitLabel: string;
  submitDisabled: boolean;
  onSubmit: () => void;
};

export const Dialog: FC<DialogProps> = (props) => (
  <Modal isOpen={props.isOpen} onClose={props.onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{props.header}</ModalHeader>

      <ModalBody>{props.children}</ModalBody>

      <ModalFooter>
        <FlexDiv flexEnd gap05>
          <Button onClick={props.onClose}>Cancel</Button>

          <Button
            colorScheme="blue"
            type="submit"
            disabled={props.submitDisabled}
            onClick={props.onSubmit}
          >
            {props.submitLabel}
          </Button>
        </FlexDiv>
      </ModalFooter>
    </ModalContent>
  </Modal>
);
