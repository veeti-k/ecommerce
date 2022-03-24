import { NextPage } from "next";
import { AuthPageLayout } from "../../components/layouts/AuthPageLayout";
import { FormEvent, useContext, useRef, useState } from "react";
import { tokenRequest } from "../../utils/requests";
import { FormWrapper, InputLabelContainer } from "../../components/Containers";
import { BigHeading, Label, Paragraph } from "../../components/Text";
import { Input, Button, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Tab, TabsContent, TabsList } from "../../components/pages/Auth";
import { useRouter } from "next/router";
import { AuthPageCard } from "../../components/Card";
import { pushUser } from "../../utils/router";
import { apiRoutes, routes } from "../../utils/routes";
import { useAuthPageRedirector } from "../../hooks/useAuthPageRedirector";
import { getMe } from "../../utils/logout";
import { UserContext } from "../../UserProvider/provider";

const Register: NextPage = () => {
  useAuthPageRedirector();

  const nameInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [pw, setPw] = useState<string>("");
  const [pwAgain, setPwAgain] = useState<string>("");
  const [showPw, setShowPw] = useState<boolean>(false);
  const [showPwAgain, setShowPwAgain] = useState<boolean>(false);

  const router = useRouter();

  const { dispatch } = useContext(UserContext);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await tokenRequest({
      method: "POST",
      path: apiRoutes.register,
      body: { name, email, password: pw },
    });
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
          <BigHeading>Register</BigHeading>
          <Paragraph style={{ paddingTop: "0.5rem" }}>Create an account</Paragraph>
          <form onSubmit={handleSubmit}>
            <FormWrapper>
              <InputLabelContainer>
                <Label htmlFor="name">Name</Label>
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
              <InputLabelContainer>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </InputLabelContainer>

              <InputLabelContainer>
                <Label htmlFor="password">Password</Label>
                <InputGroup>
                  <Input
                    type={showPw ? "text" : "password"}
                    id="password"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    autoComplete="new-password"
                    required
                  />

                  <InputRightElement width="4.5rem">
                    <Button size="sm" height="1.75rem" onClick={() => setShowPw(!showPw)}>
                      {showPw ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </InputLabelContainer>

              <InputLabelContainer>
                <Label htmlFor="password-again">Password again</Label>
                <InputGroup>
                  <Input
                    type={showPwAgain ? "text" : "password"}
                    value={pwAgain}
                    id="password-again"
                    onChange={(e) => setPwAgain(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <InputRightElement width="4.5rem">
                    <Button size="sm" height="1.75rem" onClick={() => setShowPwAgain(!showPwAgain)}>
                      {showPwAgain ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </InputLabelContainer>

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
