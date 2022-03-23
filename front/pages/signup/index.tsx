import { NextPage } from "next";
import { AuthPageLayout } from "../../components/layouts/AuthPageLayout";
import { FormEvent, useState } from "react";
import { tokenRequest } from "../../utils/requests";
import { FormWrapper, InputLabelContainer } from "../../components/Containers";
import { BigHeading, Label, Paragraph } from "../../components/Text";
import { Input, Button, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Tab, TabsContent, TabsList } from "../../components/pages/Auth";
import { useRouter } from "next/router";
import { AuthPageCard } from "../../components/Card";
import { pushUser } from "../../utils/router";

const Signup: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [pwAgain, setPwAgain] = useState<string>("");
  const [showPw, setShowPw] = useState<boolean>(false);
  const [showPwAgain, setShowPwAgain] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await tokenRequest({
      method: "POST",
      path: "/auth/register",
      body: { email, pw },
    });
    if (res) console.log(res.data);
  };

  const submitDisabled = !email || !pw || !pwAgain || pw !== pwAgain;

  return (
    <AuthPageLayout title="Sign up">
      <AuthPageCard>
        <TabsList>
          <Tab onClick={() => pushUser(router, "/login", "signup tab")}>Login</Tab>
          <Tab active>Sign Up</Tab>
        </TabsList>
        <TabsContent>
          <BigHeading>Sign up</BigHeading>
          <Paragraph style={{ paddingTop: "0.5rem" }}>Create an account</Paragraph>
          <form onSubmit={handleSubmit}>
            <FormWrapper>
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
                <Label htmlFor="password">Password again</Label>
                <InputGroup>
                  <Input
                    type={showPwAgain ? "text" : "password"}
                    value={pwAgain}
                    id="password"
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

export default Signup;
