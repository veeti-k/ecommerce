import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ChangeEventHandler, FC, useState } from "react";
import { InputLabelContainer } from "./Containers";

interface PasswordInputProps {
  label: string;
  id: string;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  value: string;
  autoComplete: string | undefined;
}

export const PasswordInputWithLabel: FC<PasswordInputProps> = ({
  id,
  label,
  onChange,
  value,
  autoComplete,
}) => {
  const [showPw, setShowPw] = useState<boolean>(false);

  return (
    <InputLabelContainer id={id} label={label}>
      <InputGroup>
        <Input
          type={showPw ? "text" : "password"}
          id={id}
          onChange={onChange}
          value={value}
          autoComplete={autoComplete}
          required
        />
        <InputRightElement width="4.5rem">
          <Button size="sm" height="1.75rem" onClick={() => setShowPw(!showPw)}>
            {showPw ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </InputLabelContainer>
  );
};
