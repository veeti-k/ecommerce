import { Button, Divider } from "@chakra-ui/react";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { FormEvent, useState } from "react";
import { CardContent } from "../../components/Card";
import { FlexDiv, MgmtSettingsPageScrollableContent } from "../../components/Containers";
import { PasswordInputWithLabel } from "../../components/Inputs";
import { SettingsPageLayout } from "../../components/layouts/Settings/SettingsPageLayout";
import { TitleContainer } from "../../components/layouts/Styles";
import { Heading, Text } from "../../components/Text";
import { ResolvedCategory } from "../../types/Category";
import { STATIC_PROPS_REQUESTS } from "../../utils/getStaticProps";

const Password: NextPage<Props> = ({ resolvedCategories }) => {
  const [currPw, setCurrPw] = useState<string>("");
  const [newPw, setNewPw] = useState<string>("");
  const [newPw2, setNewPw2] = useState<string>("");

  const changeDisabled = !newPw || !newPw2 || newPw !== newPw2;

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <SettingsPageLayout activePage="password" categories={resolvedCategories}>
      <TitleContainer>
        <div>
          <Heading>Password</Heading>
        </div>
      </TitleContainer>

      <MgmtSettingsPageScrollableContent>
        <CardContent>
          <FlexDiv column>
            <form onSubmit={onFormSubmit}>
              <FlexDiv column>
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
              </FlexDiv>
            </form>

            <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "1rem" }}>
              <Button type="submit" colorScheme="blue" disabled={changeDisabled}>
                Change password
              </Button>
            </div>

            <Divider orientation="horizontal" />

            <FlexDiv spaceBetween align>
              <div>
                <Heading>Forgot your password?</Heading>
                <Text light>Let&#39;s reset it</Text>
              </div>

              <Button>Reset password</Button>
            </FlexDiv>
          </FlexDiv>
        </CardContent>
      </MgmtSettingsPageScrollableContent>
    </SettingsPageLayout>
  );
};

export default Password;

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
