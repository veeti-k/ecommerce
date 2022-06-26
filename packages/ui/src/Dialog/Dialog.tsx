import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

import { Button } from "../Button/Button";
import { FlexDiv } from "../FlexDiv";
import {
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./Dialog.styles";

interface DialogProps extends React.ComponentProps<typeof DialogRoot> {
  title: React.ReactNode;
  description?: React.ReactNode;
  trigger: React.ReactNode;
}

export const Dialog = ({
  title,
  description,
  trigger,
  children,
  ...rest
}: DialogProps) => (
  <DialogRoot {...rest}>
    <DialogTrigger asChild>{trigger}</DialogTrigger>

    <DialogContent>
      <FlexDiv column>
        <FlexDiv justifyBetween alignCenter>
          <DialogTitle asChild>{title}</DialogTitle>

          <DialogClose asChild>
            <Button icon variant="subtle">
              <FlexDiv>
                <Cross2Icon />
              </FlexDiv>
            </Button>
          </DialogClose>
        </FlexDiv>

        {!!description && (
          <DialogDescription asChild>{description}</DialogDescription>
        )}

        {children}
      </FlexDiv>
    </DialogContent>
  </DialogRoot>
);

export const DialogClose = DialogPrimitive.Close;
