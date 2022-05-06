import { Tooltip, IconButton } from "@chakra-ui/react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { styled } from "../../../../stitches.config";
import { UserContext } from "../../../../UserProvider/provider";
import { getMe } from "../../../../utils/logout";
import { RevokeSessionRequest } from "../../../../utils/Requests/Session";
import { Card } from "../../../Card";
import { FlexDiv } from "../../../Containers";
import { TrashIcon } from "../../../Icons";
import { PulsingCircle } from "../../../pulsingCircle";
import { Text } from "../../../Text";

const Wrapper = styled(FlexDiv, {
  padding: "1rem",
});

export const Sessions = () => {
  const { state, dispatch } = useContext(UserContext);

  const revokeSession = async (sessionId: string) => {
    const notifId = toast.loading("Revoking the session");
    const res = await RevokeSessionRequest([sessionId]);

    toast.dismiss(notifId);

    if (res) {
      toast.success("Session revoked");
      getMe(dispatch);
    }
  };

  return (
    <>
      {state.sessions.map((session) => {
        const lastUsedAt = new Date(session.lastUsedAt);

        return (
          <Card key={session.sessionId} shadowNear>
            <Wrapper spaceBetween>
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

              <FlexDiv>
                <Tooltip label="Revoke session">
                  <IconButton
                    aria-label="Revoke session"
                    size="sm"
                    colorScheme="red"
                    onClick={() => revokeSession(session.sessionId)}
                  >
                    <TrashIcon />
                  </IconButton>
                </Tooltip>
              </FlexDiv>
            </Wrapper>
          </Card>
        );
      })}
    </>
  );
};
