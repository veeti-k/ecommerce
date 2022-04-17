import { Button, useDisclosure } from "@chakra-ui/react";
import { FC } from "react";
import toast from "react-hot-toast";
import { DeclineProductReviewRequest } from "../../../utils/Requests/ProductReview";
import { AlertDialog } from "../AlertDialog";

type Props = {
  productId: number;
  reviewId: string;
  getReviews: () => void;
};

export const DeclineProductReviewDialog: FC<Props> = ({ productId, reviewId, getReviews }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = async () => {
    const notifId = toast.loading("Declining review");

    const res = await DeclineProductReviewRequest(productId, reviewId);

    toast.dismiss(notifId);

    if (res) {
      toast.success("Review declined");
      getReviews();
    }
  };

  return (
    <>
      <Button colorScheme="red" size="sm" onClick={onOpen}>
        Decline
      </Button>

      <AlertDialog
        header="Decline review"
        bodyText="Are you sure you want to decline this review?"
        submitLabel="Yes, decline review"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </>
  );
};
