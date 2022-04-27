import { NextPage } from "next";
import { AuthPageLayout } from "../../components/layouts/AuthPageLayout";
import { PageTitle, Paragraph } from "../../components/Text";
import { Tab, TabsContent, TabsList } from "../../components/pages/Auth";
import { AuthPageCard } from "../../components/Card";
import { useRouter } from "next/router";
import { useAuthPageRedirector } from "../../hooks/useAuthPageRedirector";
import { pushUser } from "../../utils/router";
import { routes } from "../../utils/routes";
import { LoginForm } from "../../components/Forms/LoginForm";
import { FlexDiv } from "../../components/Containers";

const Login: NextPage = () => {
  useAuthPageRedirector();

  const router = useRouter();

  return (
    <AuthPageLayout title="Login">
      <AuthPageCard>
        <TabsList>
          <Tab active>Login</Tab>
          <Tab onClick={() => pushUser(router, routes.register, "login tab")}>Sign Up</Tab>
        </TabsList>
        <TabsContent>
          <PageTitle>Login</PageTitle>
          <FlexDiv column>
            <Paragraph style={{ paddingTop: "0.5rem" }}>
              Login or get a temporary test account
            </Paragraph>

            <LoginForm />
          </FlexDiv>
        </TabsContent>
      </AuthPageCard>
    </AuthPageLayout>
  );
};

export default Login;
