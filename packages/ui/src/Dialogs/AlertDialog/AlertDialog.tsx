import * as React from "react";

import { FlexDiv } from "../../FlexDiv";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./AlertDialog.styles";

interface ActionDialogProps
  extends Omit<React.ComponentProps<typeof AlertDialogRoot>, "children"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  trigger: React.ReactNode;

  cancel: React.ReactNode;
  action: React.ReactNode;
}

export const AlertDialog = ({
  title,
  description,
  trigger,
  cancel,
  action,
}: ActionDialogProps) => (
  <AlertDialogRoot>
    <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>

    <AlertDialogContent>
      <FlexDiv column>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        {!!description && (
          <AlertDialogDescription>{description}</AlertDialogDescription>
        )}

        <FlexDiv justifyBetween fullWidth>
          <AlertDialogCancel asChild>{cancel}</AlertDialogCancel>

          <AlertDialogAction asChild>{action}</AlertDialogAction>
        </FlexDiv>
      </FlexDiv>
    </AlertDialogContent>
  </AlertDialogRoot>
);
