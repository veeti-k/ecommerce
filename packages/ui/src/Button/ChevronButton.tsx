import { ChevronDownIcon } from "../Icons/ChevronDownIcon";
import { ChevronUpIcon } from "../Icons/ChevronUpIcon";
import { Button } from "./Button";

interface Props
  extends Pick<React.ComponentProps<typeof Button>, "variant" | "color"> {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const ChevronButton = ({ open, setOpen, ...rest }: Props) => (
  <Button icon onClick={() => setOpen(!open)} {...rest}>
    {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
  </Button>
);
