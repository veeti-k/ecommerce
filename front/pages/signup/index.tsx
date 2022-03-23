import { NextPage } from "next";
import { AuthPageLayout } from "../../components/layouts/AuthPageLayout";
import { FormEvent, useState } from "react";
import { tokenRequest } from "../../utils/requests";
import { FormWrapper, InputContainer } from "../../components/Containers";
import { Label } from "../../components/Text";
import { Input, Heading, Text, Button, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Tab, TabsContent, TabsList } from "../../components/pages/Auth";
import { useRouter } from "next/router";
import { AuthPageCard } from "../../components/Card";

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

  const pushToLogin = () => router.push("/login");

  const submitDisabled = !email || !pw || !pwAgain || pw !== pwAgain;

  return (
    <AuthPageLayout title="Sign up">
      <AuthPageCard>
        <TabsList>
          <Tab onClick={pushToLogin}>Login</Tab>
          <Tab active>Sign Up</Tab>
        </TabsList>
        <TabsContent>
          <Heading>Sign up</Heading>
          <Text style={{ paddingTop: "0.5rem" }}>Create an account</Text>
          <form onSubmit={handleSubmit}>
            <FormWrapper>
              <InputContainer column>
                <Label htmlFor="email">
                  <Text fontSize="md">Email</Text>
                </Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Label htmlFor="password">
                  <Text fontSize="md">Password</Text>
                </Label>
                <InputGroup>
                  <Input
                    type={showPw ? "text" : "password"}
                    id="password"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    required
                  />
                  <InputRightElement width="4.5rem">
                    <Button size="sm" height="1.75rem" onClick={() => setShowPw(!showPw)}>
                      {showPw ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Label htmlFor="password">
                  <Text fontSize="md">Password again</Text>
                </Label>
                <InputGroup>
                  <Input
                    type={showPwAgain ? "text" : "password"}
                    value={pwAgain}
                    id="password"
                    onChange={(e) => setPwAgain(e.target.value)}
                    required
                  />
                  <InputRightElement width="4.5rem">
                    <Button size="sm" height="1.75rem" onClick={() => setShowPwAgain(!showPwAgain)}>
                      {showPwAgain ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </InputContainer>
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
