import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ChangeEventHandler, FC, useState } from "react";
import { InputLabelContainer } from "./Containers";

interface PasswordInputProps {
  label: string;
  id: string;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  value: string;
  autoComplete: string | undefined;
  onBlur?: ChangeEventHandler<HTMLInputElement> | undefined;
  name?: string;
  error?: string;
  inputIsInvalid?: boolean;
}

export const PasswordInputWithLabel: FC<PasswordInputProps> = ({
  id,
  label,
  onChange,
  value,
  autoComplete,
  onBlur,
  name,
  error,
  inputIsInvalid,
}) => {
  const [showPw, setShowPw] = useState<boolean>(false);

  return (
    <InputLabelContainer id={id} label={label} error={error}>
      <InputGroup>
        <Input
          type={showPw ? "text" : "password"}
          id={id}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          autoComplete={autoComplete}
          name={name}
          required
          pr="4.5rem"
          isInvalid={inputIsInvalid}
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
