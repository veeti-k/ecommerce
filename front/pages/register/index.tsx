import { NextPage } from "next";
import { AuthPageLayout } from "../../components/layouts/AuthPageLayout";
import { FormEvent, useContext, useRef, useState } from "react";
import { FormWrapper, InputLabelContainer } from "../../components/Containers";
import { PageTitle, Paragraph } from "../../components/Text";
import { Input, Button } from "@chakra-ui/react";
import { Tab, TabsContent, TabsList } from "../../components/pages/Auth";
import { useRouter } from "next/router";
import { AuthPageCard } from "../../components/Card";
import { pushUser } from "../../utils/router";
import { routes } from "../../utils/routes";
import { useAuthPageRedirector } from "../../hooks/useAuthPageRedirector";
import { getMe } from "../../utils/logout";
import { UserContext } from "../../UserProvider/provider";
import { PasswordInputWithLabel } from "../../components/Inputs";
import { RegisterRequest } from "../../utils/Requests/Auth";

const Register: NextPage = () => {
  useAuthPageRedirector();

  const nameInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [pw, setPw] = useState<string>("");
  const [pwAgain, setPwAgain] = useState<string>("");

  const router = useRouter();

  const { dispatch } = useContext(UserContext);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await RegisterRequest({ name, email, password: pw });

    if (res) {
      getMe(dispatch);
      pushUser(router, routes.home, "register success");
    } else {
      setTimeout(() => {
        nameInputRef?.current && nameInputRef.current.focus();
      }, 1500);
    }
  };

  const submitDisabled = !email || !pw || !pwAgain || pw !== pwAgain;

  return (
    <AuthPageLayout title="Register">
      <AuthPageCard>
        <TabsList>
          <Tab onClick={() => pushUser(router, routes.login, "register tab")}>Login</Tab>
          <Tab active>Register</Tab>
        </TabsList>
        <TabsContent>
          <PageTitle>Register</PageTitle>
          <Paragraph style={{ paddingTop: "0.5rem" }}>Create an account</Paragraph>
          <form onSubmit={handleSubmit}>
            <FormWrapper>
              <InputLabelContainer id="name" label="Name">
                <Input
                  ref={nameInputRef}
                  type="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </InputLabelContainer>
              <InputLabelContainer id="email" label="Email">
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </InputLabelContainer>

              <PasswordInputWithLabel
                id="password"
                label="Password"
                onChange={(e) => setPw(e.target.value)}
                value={pw}
                autoComplete="new-password"
              />

              <PasswordInputWithLabel
                id="password-again"
                label="Password again"
                onChange={(e) => setPwAgain(e.target.value)}
                value={pwAgain}
                autoComplete="new-password"
              />

              <Button type="submit" disabled={submitDisabled} colorScheme="blue">
                Sign up
              </Button>
            </FormWrapper>
          </form>
        </TabsContent>
      </AuthPageCard>
    </AuthPageLayout>
  );
};

export default Register;
