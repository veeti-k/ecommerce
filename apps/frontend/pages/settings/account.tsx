import { FormEvent, useContext, useEffect, useState } from "react";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { Button, Divider, Input } from "@chakra-ui/react";
import {
  FlexDiv,
  InputLabelContainer,
  MgmtSettingsPageScrollableContent,
} from "../../components/Containers";
import { Heading, Text } from "../../components/Text";
import { UserContext } from "../../UserProvider/provider";
import { toast } from "react-hot-toast";
import { Actions } from "../../UserProvider/types";
import { SettingsPageLayout } from "../../components/layouts/Settings/SettingsPageLayout";
import { TitleContainer } from "../../components/layouts/Styles";
import { DeleteAccountDialog } from "../../components/Dialogs/Account/DeleteAccountDialog";
import { UpdateAccountRequest } from "../../utils/Requests/Account";
import { ResolvedCategory } from "../../types/Category";
import { CardContent } from "../../components/Card";
import { STATIC_PROPS_REQUESTS } from "../../utils/getStaticProps";
import { BreakpointContext } from "../../BreakpointProvider/BreakpointProvider";

const Account: NextPage<Props> = ({ resolvedCategories }) => {
  const { state, dispatch } = useContext(UserContext);
  const { state: bpState } = useContext(BreakpointContext);

  const [name, setName] = useState<string>(state.name);
  const [ogName, setOgName] = useState<string>(state.name);

  const [email, setEmail] = useState<string>(state.email);
  const [ogEmail, setOgEmail] = useState<string>(state.email);

  const [phoneNumber, setPhoneNumber] = useState<string | null>(state.phoneNumber);
  const [ogPhoneNumber, setOgPhoneNumber] = useState<string | null>(state.phoneNumber);

  useEffect(() => {
    setName(state.name);
    setEmail(state.email);
    setPhoneNumber(state.phoneNumber);
    setOgName(state.name);
    setOgEmail(state.email);
    setOgPhoneNumber(state.phoneNumber);
  }, [state]);

  const saveDisabled =
    (!name || name.trim() === ogName) &&
    (!email || email.trim() === ogEmail) &&
    (!phoneNumber || phoneNumber.trim() === ogPhoneNumber);

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const notifId = toast.loading("Saving your edits");

    const res = await UpdateAccountRequest({ name, email, phoneNumber });

    toast.dismiss(notifId);

    if (res) {
      toast.success("Account settings updated successfully!");
      dispatch({ type: Actions.SetUser, payload: res.data });
    }
  };

  return (
    <SettingsPageLayout activePage="account" categories={resolvedCategories}>
      <TitleContainer>
        <div>
          <Heading>General Info</Heading>
        </div>
      </TitleContainer>

      <MgmtSettingsPageScrollableContent>
        <CardContent>
          <FlexDiv column>
            <form onSubmit={onFormSubmit}>
              <FlexDiv column>
                <InputLabelContainer id="name" label="Name">
                  <Input
                    id="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputLabelContainer>

                <FlexDiv>
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
                </FlexDiv>
              </FlexDiv>

              <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "1rem" }}>
                <Button colorScheme="blue" disabled={saveDisabled} type="submit">
                  Save
                </Button>
              </div>
            </form>

            <Divider orientation="horizontal" />

            <FlexDiv spaceBetween align justify={bpState.bp === "mobile"}>
              {bpState.bp === "mobile" ? null : (
                <div>
                  <Heading>Delete account</Heading>
                  <Text light>Your account will be permanently deleted</Text>
                </div>
              )}
              <DeleteAccountDialog />
            </FlexDiv>
          </FlexDiv>
        </CardContent>
      </MgmtSettingsPageScrollableContent>
    </SettingsPageLayout>
  );
};

export default Account;

type Props = {
  resolvedCategories: ResolvedCategory[];
};

export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<Props>> => {
  const resolvedCategories = await STATIC_PROPS_REQUESTS.Categories.getAllResolved();

  return {
    props: {
      resolvedCategories,
    },
  };
};
