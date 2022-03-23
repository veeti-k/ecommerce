import { Button, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { FormEvent, useState } from "react";
import { FlexDiv } from "../../components/Containers";
import { Layout } from "../../components/layouts/Layout";
import {
  Content,
  Grid,
  InputLabelContainer,
  MainGrid,
  PageSelectorButtons,
  TempCard,
  TitleAndLogout,
  TitleContainer,
} from "../../components/pages/Settings";
import { Separator } from "../../components/Separator";
import { Label } from "../../components/Text";
import { useGetMe } from "../../hooks/useGetMe";
import { useIsLoggedIn } from "../../hooks/useIsLoggedIn";

const Password: NextPage = () => {
  const isLoggedIn = useIsLoggedIn();
  useGetMe();

  const [currPw, setCurrPw] = useState<string>("");
  const [newPw, setNewPw] = useState<string>("");
  const [newPw2, setNewPw2] = useState<string>("");

  const [showCurrPw, setShowCurrPw] = useState<boolean>(false);
  const [showNewPw, setShowNewPw] = useState<boolean>(false);
  const [showNewPw2, setShowNewPw2] = useState<boolean>(false);

  const changeDisabled = !newPw || !newPw2 || newPw !== newPw2;

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Layout>
      {isLoggedIn ? (
        <>
          <TitleAndLogout />

          <TempCard>
            <MainGrid>
              <PageSelectorButtons activePage="password" />
              <Content>
                <TitleContainer>
                  <Text fontWeight="bold">Password</Text>
                  <Text fontWeight="light" fontSize="sm">
                    Change or reset your password
                  </Text>
                </TitleContainer>

                <form onSubmit={onFormSubmit}>
                  <Grid col1>
                    <InputLabelContainer>
                      <Label htmlFor="current-password">Current password</Label>
                      <InputGroup>
                        <Input
                          type={showCurrPw ? "text" : "password"}
                          id="current-password"
                          value={currPw}
                          onChange={(e) => setCurrPw(e.target.value)}
                          autoComplete="current-password"
                          required
                        />
                        <InputRightElement width="4.5rem">
                          <Button
                            size="sm"
                            height="1.75rem"
                            onClick={() => setShowCurrPw(!showCurrPw)}
                          >
                            {showCurrPw ? "Hide" : "Show"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </InputLabelContainer>

                    <InputLabelContainer>
                      <Label htmlFor="new-password">New password</Label>
                      <InputGroup>
                        <Input
                          type={showNewPw ? "text" : "password"}
                          id="new-password"
                          value={newPw}
                          onChange={(e) => setNewPw(e.target.value)}
                          autoComplete="new-password"
                          required
                        />
                        <InputRightElement width="4.5rem">
                          <Button
                            size="sm"
                            height="1.75rem"
                            onClick={() => setShowNewPw(!showNewPw)}
                          >
                            {showNewPw ? "Hide" : "Show"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </InputLabelContainer>
                    <InputLabelContainer>
                      <Label htmlFor="new-password-again">New password again</Label>
                      <InputGroup>
                        <Input
                          type={showNewPw2 ? "text" : "password"}
                          id="new-password-again"
                          value={newPw2}
                          onChange={(e) => setNewPw2(e.target.value)}
                          autoComplete="new-password"
                          required
                        />
                        <InputRightElement width="4.5rem">
                          <Button
                            size="sm"
                            height="1.75rem"
                            onClick={() => setShowNewPw2(!showNewPw2)}
                          >
                            {showNewPw2 ? "Hide" : "Show"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </InputLabelContainer>
                  </Grid>
                </form>

                <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "1rem" }}>
                  <Button type="submit" colorScheme="blue" disabled={changeDisabled}>
                    Change password
                  </Button>
                </div>

                <Separator orientation="horizontal" />
                <FlexDiv spaceBetween align>
                  <div>
                    <Text fontWeight="bold">Forgot your password?</Text>
                    <Text fontWeight="light" fontSize="sm">
                      Let&#39;s reset it
                    </Text>
                  </div>

                  <Button>Reset password</Button>
                </FlexDiv>
              </Content>
            </MainGrid>
          </TempCard>
        </>
      ) : null}
    </Layout>
  );
};

export default Password;
