import { NextPage } from "next";
import { AuthPageLayout } from "../../components/layouts/AuthPageLayout";
import { FormEvent, useContext, useRef, useState } from "react";
import { FormWrapper, InputLabelContainer } from "../../components/Containers";
import { PageTitle, Paragraph } from "../../components/Text";
import { Input, Button } from "@chakra-ui/react";
import { Tab, TabsContent, TabsList } from "../../components/pages/Auth";
import { AuthPageCard } from "../../components/Card";
import { useRouter } from "next/router";
import { useAuthPageRedirector } from "../../hooks/useAuthPageRedirector";
import { pushUser } from "../../utils/router";
import { routes } from "../../utils/routes";
import { getMe } from "../../utils/logout";
import { UserContext } from "../../UserProvider/provider";
import { PasswordInputWithLabel } from "../../components/Inputs";
import { LoginRequest } from "../../utils/Requests/Auth";

const Login: NextPage = () => {
  useAuthPageRedirector();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const emailInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { dispatch } = useContext(UserContext);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await LoginRequest({ email, password });

    if (res) {
      getMe(dispatch);
      pushUser(router, routes.home, "login success");
    } else {
      setTimeout(() => {
        emailInputRef?.current && emailInputRef.current.focus();
      }, 1500);
    }
  };

  const submitDisabled = !email || !password;

  return (
    <AuthPageLayout title="Login">
      <AuthPageCard>
        <TabsList>
          <Tab active>Login</Tab>
          <Tab onClick={() => pushUser(router, routes.register, "login tab")}>Sign Up</Tab>
        </TabsList>
        <TabsContent>
          <PageTitle>Login</PageTitle>
          <Paragraph style={{ paddingTop: "0.5rem" }}>
            Login or get a temporary test account
          </Paragraph>
          <form onSubmit={handleSubmit}>
            <FormWrapper>
              <InputLabelContainer id="email" label="Email">
                <Input
                  ref={emailInputRef}
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  required
                />
              </InputLabelContainer>
              <PasswordInputWithLabel
                id="password"
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                autoComplete="current-password"
              />
              <Button type="submit" disabled={submitDisabled} colorScheme="blue">
                Login
              </Button>
            </FormWrapper>
          </form>
        </TabsContent>
      </AuthPageCard>
    </AuthPageLayout>
  );
};

export default Login;
