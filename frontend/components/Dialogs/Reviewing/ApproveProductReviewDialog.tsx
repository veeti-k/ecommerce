import { Button, useDisclosure } from "@chakra-ui/react";
import { FC } from "react";
import toast from "react-hot-toast";
import { ApproveProductReviewRequest } from "../../../utils/Requests/ProductReview";
import { AlertDialog } from "../AlertDialog";

type Props = {
  productId: number;
  reviewId: string;
  getReviews: () => void;
};

export const ApproveProductReviewDialog: FC<Props> = ({ productId, reviewId, getReviews }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = async () => {
    const notifId = toast.loading("Approving review");

    const res = await ApproveProductReviewRequest(productId, reviewId);

    toast.dismiss(notifId);

    if (res) {
      toast.success("Review approved");
      getReviews();
    }
  };

  return (
    <>
      <Button colorScheme="green" size="sm" onClick={onOpen}>
        Approve
      </Button>

      <AlertDialog
        header="Approve review"
        bodyText="Are you sure you want to approve this review?"
        submitLabel="Yes, approve review"
        submitColor="green"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </>
  );
};