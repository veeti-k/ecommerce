import { NextPage } from "next";
import { AuthPageLayout } from "../../components/layouts/AuthPageLayout";
import { FormEvent, useState } from "react";
import { tokenRequest } from "../../utils/requests";
import { FormWrapper, InputLabelContainer } from "../../components/Containers";
import { BigHeading, Label, Paragraph } from "../../components/Text";
import { Input, Button, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Tab, TabsContent, TabsList } from "../../components/pages/Auth";
import { AuthPageCard } from "../../components/Card";
import { useRouter } from "next/router";
import { useAuthPageRedirector } from "../../hooks/useAuthPageRedirector";
import { pushUser } from "../../utils/router";
import { apiRoutes, routes } from "../../utils/routes";

const Login: NextPage = () => {
  useAuthPageRedirector();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPw, setShowPw] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await tokenRequest({
      method: "POST",
      path: apiRoutes.login,
      body: { email, password },
    });
    if (res) pushUser(router, routes.home, "login success");
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
          <BigHeading>Login</BigHeading>
          <Paragraph style={{ paddingTop: "0.5rem" }}>
            Login or get a temporary test account
          </Paragraph>
          <form onSubmit={handleSubmit}>
            <FormWrapper>
              <InputLabelContainer>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  required
                />
              </InputLabelContainer>
              <InputLabelContainer>
                <Label htmlFor="password">Password</Label>
                <InputGroup>
                  <Input
                    type={showPw ? "text" : "password"}
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
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
