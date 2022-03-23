import { NextPage } from "next";
import { Button, Input } from "@chakra-ui/react";
import { FlexDiv, InputLabelContainer } from "../../components/Containers";
import {
  TempCard,
  PageSelectorButtons,
  TitleContainer,
  Grid,
  Content,
  MainGrid,
  TitleAndLogout,
} from "../../components/pages/Settings";
import { useGetMe } from "../../hooks/useGetMe";
import { useIsLoggedIn } from "../../hooks/useIsLoggedIn";
import { Separator } from "../../components/Separator";
import { Layout } from "../../components/layouts/Layout";
import { Heading, Label, Paragraph } from "../../components/Text";
import { FormEvent, useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../../globalState/store";
import { DeleteAccountDialog } from "../../components/DeleteAccountDialog";

const Account: NextPage = () => {
  const isLoggedIn = useIsLoggedIn();
  useGetMe();

  const { state } = useContext(GlobalStateContext);

  const [firstName, setFirstName] = useState<string>(state.user.firstName);
  const [ogFirstName, setOgFirstName] = useState<string>(state.user.firstName);

  const [lastName, setLastName] = useState<string>(state.user.lastName);
  const [ogLastName, setOgLastName] = useState<string>(state.user.lastName);

  const [email, setEmail] = useState<string>(state.user.email);
  const [ogEmail, setOgEmail] = useState<string>(state.user.email);

  const [phoneNumber, setPhoneNumber] = useState<string | null>(state.user.phoneNumber);
  const [ogPhoneNumber, setOgPhoneNumber] = useState<string | null>(state.user.phoneNumber);

  useEffect(() => {
    // state is not populated at first render
    // so changes to the state needs to be listened for :/
    setFirstName(state.user.firstName);
    setOgFirstName(state.user.firstName);
    setLastName(state.user.lastName);
    setOgLastName(state.user.lastName);
    setEmail(state.user.email);
    setOgEmail(state.user.email);
    setPhoneNumber(state.user.phoneNumber);
    setOgPhoneNumber(state.user.phoneNumber);
  }, [state.user]);

  // disable save button if nothing has changed or
  // some of the fields are empty
  const saveDisabled =
    (!firstName || firstName.trim() === ogFirstName) &&
    (!lastName || lastName.trim() === ogLastName) &&
    (!email || email.trim() === ogEmail) &&
    (!phoneNumber || phoneNumber.trim() === ogPhoneNumber);

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
              <PageSelectorButtons activePage="account" />
              <Content>
                <TitleContainer>
                  <Heading>General Info</Heading>
                  <Paragraph light>Save your changes after editing</Paragraph>
                </TitleContainer>

                <form onSubmit={onFormSubmit}>
                  <Grid>
                    <InputLabelContainer>
                      <Label htmlFor="first-name">First Name</Label>
                      <Input
                        id="first-name"
                        autoComplete="given-name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </InputLabelContainer>

                    <InputLabelContainer>
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input
                        id="last-name"
                        autoComplete="family-name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </InputLabelContainer>

                    <InputLabelContainer>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </InputLabelContainer>

                    <InputLabelContainer>
                      <Label htmlFor="phone-number">Phone number</Label>
                      <Input
                        id="phone-number"
                        type="tel"
                        autoComplete="tel"
                        value={phoneNumber ?? ""}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </InputLabelContainer>
                  </Grid>
                </form>

                <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "1rem" }}>
                  <Button colorScheme="blue" disabled={saveDisabled}>
                    Save changes
                  </Button>
                </div>

                <Separator orientation="horizontal" />

                <FlexDiv spaceBetween align>
                  <div>
                    <Heading>Delete account</Heading>
                    <Paragraph light>Your account will be permanently deleted</Paragraph>
                  </div>
                  <DeleteAccountDialog />
                </FlexDiv>
              </Content>
            </MainGrid>
          </TempCard>
        </>
      ) : null}
    </Layout>
  );
};

export default Account;
