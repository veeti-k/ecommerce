import { NextPage } from "next";
import { AuthPageLayout } from "../../components/layouts/AuthPageLayout";
import { FormEvent, useState } from "react";
import { authRequest } from "../../utils/requests";
import { FormWrapper } from "../../components/FormWrapper";
import { InputContainer } from "../../components/Containers";
import { Label } from "../../components/Text";
import { Input, Heading, Text, Button, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Tab, TabsContent, TabsList } from "../../components/Auth";
import { Card } from "../../components/Card";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPw, setShowPw] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await authRequest({ email, password });
    if (res) console.log(res.data);
  };

  const pushToSignup = () => router.push("/signup");

  const submitDisabled = !email || !password;

  return (
    <AuthPageLayout title="Login">
      <Card>
        <TabsList>
          <Tab active>Login</Tab>
          <Tab onClick={pushToSignup}>Sign Up</Tab>
        </TabsList>
        <TabsContent>
          <Heading>Login</Heading>
          <Text style={{ paddingTop: "1rem" }}>Login or get a temporary test account</Text>
          <form onSubmit={handleSubmit}>
            <FormWrapper>
              <InputContainer column>
                <Label htmlFor="email">
                  <Text fontSize="md">Email</Text>
                </Label>
                <Input
                  type="email"
                  id="email"
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
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <InputRightElement width="4.5rem">
                    <Button size="sm" height="1.75rem" onClick={() => setShowPw(!showPw)}>
                      {showPw ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </InputContainer>
              <Button type="submit" disabled={submitDisabled} colorScheme="blue">
                Login
              </Button>
            </FormWrapper>
          </form>
        </TabsContent>
      </Card>
    </AuthPageLayout>
  );
};

export default Login;
