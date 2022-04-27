import { Formik } from "formik";
import { useContext, useRef } from "react";
import { getMe } from "../../utils/logout";
import { LoginRequest } from "../../utils/Requests/Auth";
import { UserContext } from "../../UserProvider/provider";
import { FlexDiv, InputLabelContainer } from "../Containers";
import { Button, Input } from "@chakra-ui/react";
import { PasswordInputWithLabel } from "../Inputs";
import { useRouter } from "next/router";
import { pushUser } from "../../utils/router";

export const LoginForm = () => {
  const { dispatch } = useContext(UserContext);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const onSubmit = async (values: any) => {
    const res = await LoginRequest(values);

    if (res) {
      getMe(dispatch);
      pushUser(router, "/", "login success");
    } else {
      setTimeout(() => {
        emailInputRef?.current && emailInputRef.current.focus();
      }, 1500);
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, values, handleChange }) => (
        <form onSubmit={handleSubmit}>
          <FlexDiv column gap05>
            <InputLabelContainer id="email" label="Email">
              <Input
                autoComplete="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                isRequired
              />
            </InputLabelContainer>

            <PasswordInputWithLabel
              autoComplete="password"
              id="password"
              label="Password"
              onChange={handleChange}
              value={values.password}
              name="password"
            />

            <Button mt={"0.5rem"} type="submit" colorScheme="blue">
              Login
            </Button>
          </FlexDiv>
        </form>
      )}
    </Formik>
  );
};
