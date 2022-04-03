import { FormEvent, useContext, useEffect, useState } from "react";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { Button, Input } from "@chakra-ui/react";
import { FlexDiv, InputLabelContainer } from "../../components/Containers";
import { TitleContainer, Grid } from "../../components/pages/Settings";
import { useGetMe } from "../../hooks/useGetMe";
import { Separator } from "../../components/Separator";
import { Heading, Paragraph } from "../../components/Text";
import { UserContext } from "../../UserProvider/provider";
import { request } from "../../utils/requests";
import { apiRoutes } from "../../utils/routes";

import { toast } from "react-hot-toast";
import { Actions } from "../../UserProvider/types";
import { DeleteAccountDialog } from "../../components/Dialogs/DeleteAccountDialog";
import { SettingsPageLayout } from "../../components/layouts/SettingsPageLayout";
import { ResolvedCategory } from "../../types";
import { getCategories_STATIC_PROPS } from "../../utils/getStaticProps";

type Result = {
  categories: ResolvedCategory[];
};

export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<Result>> => {
  const categories = await getCategories_STATIC_PROPS();

  return {
    props: {
      categories,
    },
  };
};

const Account: NextPage<Result> = ({ categories }) => {
  useGetMe();

  const { state, dispatch } = useContext(UserContext);

  const [name, setName] = useState<string>(state.name);
  const [ogName, setOgName] = useState<string>(state.name);

  const [email, setEmail] = useState<string>(state.email);
  const [ogEmail, setOgEmail] = useState<string>(state.email);

  const [phoneNumber, setPhoneNumber] = useState<string | null>(state.phoneNumber);
  const [ogPhoneNumber, setOgPhoneNumber] = useState<string | null>(state.phoneNumber);

  useEffect(() => {
    // state is not populated at first render
    // so changes to the state needs to be listened for :/
    setName(state.name);
    setEmail(state.email);
    setPhoneNumber(state.phoneNumber);
    setOgName(state.name);
    setOgEmail(state.email);
    setOgPhoneNumber(state.phoneNumber);
  }, [state]);

  // disable save button if nothing has changed or
  // some of the fields are empty
  const saveDisabled =
    (!name || name.trim() === ogName) &&
    (!email || email.trim() === ogEmail) &&
    (!phoneNumber || phoneNumber.trim() === ogPhoneNumber);

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const notifId = toast.loading("Saving your edits");

    const res = await request({
      method: "PATCH",
      path: apiRoutes.userRoot("me"),
      body: {
        name,
        email,
        phoneNumber,
      },
    });

    toast.dismiss(notifId);

    if (res) {
      toast.success("Account settings updated successfully!");
      dispatch({ type: Actions.SetUser, payload: res.data });
    }
  };

  return (
    <SettingsPageLayout categories={categories}>
      <TitleContainer>
        <div>
          <Heading>General Info</Heading>
          <Paragraph light>Save your changes after editing</Paragraph>
        </div>
      </TitleContainer>

      <form onSubmit={onFormSubmit}>
        <InputLabelContainer id="name" label="Name">
          <Input
            id="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputLabelContainer>

        <Grid col2 style={{ paddingTop: "1rem" }}>
          <InputLabelContainer id="email" label="Email">
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputLabelContainer>

          <InputLabelContainer id="phone-number" label="Phone number">
            <Input
              id="phone-number"
              type="tel"
              autoComplete="tel"
              value={phoneNumber ?? ""}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </InputLabelContainer>
        </Grid>

        <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "1rem" }}>
          <Button colorScheme="blue" disabled={saveDisabled} type="submit">
            Save changes
          </Button>
        </div>
      </form>

      <Separator orientation="horizontal" />

      <FlexDiv spaceBetween align>
        <div>
          <Heading>Delete account</Heading>
          <Paragraph light>Your account will be permanently deleted</Paragraph>
        </div>
        <DeleteAccountDialog />
      </FlexDiv>
    </SettingsPageLayout>
  );
};

export default Account;
