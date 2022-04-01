import { Button } from "@chakra-ui/react";
import { NextPage } from "next";
import { FormEvent, useState } from "react";
import { FlexDiv } from "../../components/Containers";
import { PasswordInputWithLabel } from "../../components/Inputs";
import { SettingsPageLayout } from "../../components/layouts/SettingsPageLayout";
import { Grid, TitleContainer } from "../../components/pages/Settings";
import { Separator } from "../../components/Separator";
import { Heading, Paragraph } from "../../components/Text";
import { useGetMe } from "../../hooks/useGetMe";

const Password: NextPage = () => {
  useGetMe();

  const [currPw, setCurrPw] = useState<string>("");
  const [newPw, setNewPw] = useState<string>("");
  const [newPw2, setNewPw2] = useState<string>("");

  const changeDisabled = !newPw || !newPw2 || newPw !== newPw2;

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <SettingsPageLayout>
      <TitleContainer>
        <div>
          <Heading>Password</Heading>
          <Paragraph light>Change or reset your password</Paragraph>
        </div>
      </TitleContainer>

      <form onSubmit={onFormSubmit}>
        <Grid col1>
          <PasswordInputWithLabel
            id="current-password"
            label="Current password"
            autoComplete="current-password"
            onChange={(e) => setCurrPw(e.target.value)}
            value={currPw}
          />
          <PasswordInputWithLabel
            id="new-password"
            label="New password"
            autoComplete="new-password"
            onChange={(e) => setNewPw(e.target.value)}
            value={newPw}
          />
          <PasswordInputWithLabel
            id="new-password-again"
            label="New password again"
            autoComplete="new-password"
            onChange={(e) => setNewPw2(e.target.value)}
            value={newPw2}
          />
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
          <Heading>Forgot your password?</Heading>
          <Paragraph light>Let&#39;s reset it</Paragraph>
        </div>

        <Button>Reset password</Button>
      </FlexDiv>
    </SettingsPageLayout>
  );
};

export default Password;
