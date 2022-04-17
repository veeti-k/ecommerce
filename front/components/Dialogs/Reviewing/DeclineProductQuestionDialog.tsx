import { Button, useDisclosure } from "@chakra-ui/react";
import { FC } from "react";
import toast from "react-hot-toast";
import { DeclineProductQuestionRequest } from "../../../utils/Requests/ProductQuestion";
import { AlertDialog } from "../AlertDialog";

type Props = {
  productId: number;
  questionId: string;
  getQuestions: () => void;
};

export const DeclineProductQuestionDialog: FC<Props> = ({
  productId,
  questionId,
  getQuestions,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = async () => {
    const notifId = toast.loading("Declining question");

    const res = await DeclineProductQuestionRequest(productId, questionId);

    toast.dismiss(notifId);

    if (res) {
      toast.success("Question declined");
      getQuestions();
    }
  };

  return (
    <>
      <Button colorScheme="red" size="sm" onClick={onOpen}>
        Decline
      </Button>

      <AlertDialog
        header="Decline question"
        bodyText="Are you sure you want to decline this question?"
        submitLabel="Yes, decline question"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </>
  );
};
