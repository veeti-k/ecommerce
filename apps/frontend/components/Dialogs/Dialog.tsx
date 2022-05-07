import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { FC, FormEvent, ReactNode, useContext } from "react";
import { BreakpointContext } from "../../BreakpointProvider/BreakpointProvider";
import { FlexDiv } from "../Containers";

type DialogProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;

  children: ReactNode;

  header: string;

  submitLabel: string;
  submitDisabled?: boolean;
  onSubmit: () => void;

  submitBtnIsLoading?: boolean;
  submitBtnLoadingText?: string;
};

export const Dialog: FC<DialogProps> = (props) => {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    props.onSubmit();
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.header}</ModalHeader>

        <form onSubmit={onSubmit}>
          <ModalBody>{props.children}</ModalBody>

          <ModalFooter>
            <FlexDiv flexEnd gap05>
              <Button onClick={props.onClose}>Cancel</Button>

              <Button
                colorScheme="blue"
                type="submit"
                disabled={props.submitDisabled || props.submitBtnIsLoading}
                isLoading={props.submitBtnIsLoading}
                loadingText={props.submitBtnLoadingText}
              >
                {props.submitLabel}
              </Button>
            </FlexDiv>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

interface Dialog2Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: ReactNode;
}

export const Dialog2: FC<Dialog2Props> = ({ isOpen, onOpen, onClose, children }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>{children}</ModalContent>
  </Modal>
);

export const DialogHeader: FC<{ children: ReactNode }> = ({ children }) => {
  const { state } = useContext(BreakpointContext);

  const mobile = state.bp === "mobile";

  return <ModalHeader p={mobile ? "0.8rem" : ""}>{children}</ModalHeader>;
};

export const DialogBody: FC<{ children: ReactNode }> = ({ children }) => {
  const { state } = useContext(BreakpointContext);

  const mobile = state.bp === "mobile";

  return <ModalBody p={mobile ? "0.8rem" : ""}>{children}</ModalBody>;
};
