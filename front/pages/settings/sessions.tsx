import { IconButton, Tooltip } from "@chakra-ui/react";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { useContext } from "react";
import { Card } from "../../components/Card";
import { FlexDiv, MgmtSettingsPageScrollableContent } from "../../components/Containers";
import { TrashIcon } from "../../components/Icons";
import { PulsingCircle } from "../../components/pulsingCircle";
import { Heading, Text } from "../../components/Text";
import { UserContext } from "../../UserProvider/provider";
import { useGetMe } from "../../hooks/useGetMe";
import { styled } from "../../stitches.config";
import toast from "react-hot-toast";
import { getMe } from "../../utils/logout";
import { SettingsPageLayout } from "../../components/layouts/SettingsPageLayout";
import { ResolvedCategory } from "../../types";
import { getCategories_STATIC_PROPS } from "../../utils/getStaticProps";
import { TitleContainer } from "../../components/layouts/Styles";
import { RevokeSessionRequest } from "../../utils/Requests/Session";

const SessionCard = styled(Card, {
  display: "flex",
  justifyContent: "space-between",
  boxShadow: "rgba(99, 99, 99, 0.1) 0px 2px 8px 0px",
  padding: "1rem",
});

const SessionCardButtons = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

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
const Sessions: NextPage<Result> = ({ categories }) => {
  useGetMe();

  const { state, dispatch } = useContext(UserContext);

  const revokeSession = async (sessionId: string) => {
    const notifId = toast.loading("Revoking the session");
    const res = await RevokeSessionRequest(sessionId);

    toast.dismiss(notifId);

    if (res) {
      toast.success("Session revoked");
      getMe(dispatch);
    }
  };

  return (
    <SettingsPageLayout categories={categories}>
      <TitleContainer>
        <div>
          <Heading>Sessions</Heading>
          <Text light>Manage your sessions</Text>
        </div>
      </TitleContainer>
      <MgmtSettingsPageScrollableContent>
        <FlexDiv column>
          {state.sessions.map((session) => {
            const lastUsedAt = new Date(session.lastUsedAt);

            return (
              <SessionCard key={session.id}>
                <div>
                  <FlexDiv gap05 align>
                    {session.isCurrentSession ? (
                      <Tooltip label="Current session">
                        <PulsingCircle />
                      </Tooltip>
                    ) : null}
                    <Text bold>123.321.123.321</Text>
                  </FlexDiv>

                  <Tooltip label="Last used at">
                    <Text light>
                      {lastUsedAt.toLocaleDateString()} - {lastUsedAt.toLocaleTimeString()}
                    </Text>
                  </Tooltip>
                </div>

                <SessionCardButtons>
                  <Tooltip label="Revoke session">
                    <IconButton
                      aria-label="Revoke session"
                      size="sm"
                      colorScheme="red"
                      onClick={() => revokeSession(session.id)}
                    >
                      <TrashIcon />
                    </IconButton>
                  </Tooltip>
                </SessionCardButtons>
              </SessionCard>
            );
          })}
        </FlexDiv>
      </MgmtSettingsPageScrollableContent>
    </SettingsPageLayout>
  );
};

export default Sessions;
