import { NextPage } from "next";
import { AuthPageLayout } from "../../components/layouts/AuthPageLayout";
import { FlexDiv } from "../../components/Containers";
import { PageTitle, Paragraph } from "../../components/Text";
import { Tab, TabsContent, TabsList } from "../../components/pages/Auth";
import { useRouter } from "next/router";
import { AuthPageCard } from "../../components/Card";
import { pushUser } from "../../utils/router";
import { routes } from "../../utils/routes";
import { useAuthPageRedirector } from "../../hooks/useAuthPageRedirector";
import { RegisterForm } from "../../components/Forms/RegisterForm";

const Register: NextPage = () => {
  useAuthPageRedirector();

  const router = useRouter();

  return (
    <AuthPageLayout title="Register">
      <AuthPageCard>
        <TabsList>
          <Tab onClick={() => pushUser(router, routes.login, "register tab")}>Login</Tab>
          <Tab active>Register</Tab>
        </TabsList>
        <TabsContent>
          <PageTitle>Register</PageTitle>
          <FlexDiv column>
            <Paragraph style={{ paddingTop: "0.5rem" }}>Create an account</Paragraph>
            <RegisterForm />
          </FlexDiv>
        </TabsContent>
      </AuthPageCard>
    </AuthPageLayout>
  );
};

export default Register;
