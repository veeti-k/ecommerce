import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ChangeEventHandler, useState } from "react";
import { InputLabelContainer } from "./Containers";

interface PasswordInputProps {
  label: string;
  id: string;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
}

export const PasswordInputWithLabel = ({ onChange, id, label }: PasswordInputProps) => {
  const [showPw, setShowPw] = useState<boolean>(false);

  return (
    <InputLabelContainer id={id} label={label}>
      <InputGroup>
        <Input
          type={showPw ? "text" : "password"}
          id="password"
          onChange={onChange}
          autoComplete="current-password"
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
