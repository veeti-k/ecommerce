import { Button, useDisclosure } from "@chakra-ui/react";
import { FC } from "react";
import toast from "react-hot-toast";
import { ApproveProductQuestionRequest } from "../../../utils/Requests/ProductQuestion";
import { AlertDialog } from "../AlertDialog";

type Props = {
  productId: number;
  questionId: string;
  getQuestions: () => void;
};

export const ApproveProductQuestionDialog: FC<Props> = ({
  productId,
  questionId,
  getQuestions,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = async () =>
    toast.promise(
      (async () => {
        const res = await ApproveProductQuestionRequest(productId, questionId);
        if (!res) throw 1;

        getQuestions();
      })(),
      {
        loading: "Approving question",
        success: "Question approved!",
        error: "Failed to approve question",
      }
    );

  return (
    <>
      <Button colorScheme="green" size="sm" onClick={onOpen}>
        Approve
      </Button>

      <AlertDialog
        header="Approve question"
        bodyText="Are you sure you want to approve this question?"
        submitLabel="Yes, approve question"
        submitColor="green"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </>
  );
};
