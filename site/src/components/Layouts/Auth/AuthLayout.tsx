import { Button, Card, FlexDiv, Text } from "@ecommerce/ui";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import { getAuthError } from "~utils/getAuthError";

import { AuthLayoutContent, AuthLayoutMain } from "./AuthLayout.styles";

export const AuthLayout = () => {
  const router = useRouter();

  const errorMessage = getAuthError(router?.query?.error?.toString());

  return (
    <AuthLayoutMain>
      <AuthLayoutContent>
        <img src="/logo.svg" width="100px" />

        {!!errorMessage && (
          <Card variant="error">
            <FlexDiv justifyCenter>
              <Text>{errorMessage}</Text>
            </FlexDiv>
          </Card>
        )}

        <FlexDiv justifyCenter>
          <Button onClick={() => signIn("google")}>Kirjaudu sisään</Button>
        </FlexDiv>
      </AuthLayoutContent>
    </AuthLayoutMain>
  );
};
