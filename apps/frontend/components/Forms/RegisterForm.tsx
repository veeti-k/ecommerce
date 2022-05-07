import { Button, Input } from "@chakra-ui/react";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useContext, useRef } from "react";
import * as Yup from "yup";
import { UserContext } from "../../UserProvider/provider";
import { GetMe } from "../../utils/Requests/Account";
import { RegisterRequest } from "../../utils/Requests/Auth";
import { pushUser } from "../../utils/router";
import { FlexDiv, InputLabelContainer } from "../Containers";

const validationSchema = Yup.object().shape({
  name: Yup.string().min(3, "Too short!").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(4, "Too short!").required("Required"),
  passwordAgain: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

export const RegisterForm = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const { dispatch } = useContext(UserContext);
  const router = useRouter();

  const onSubmit = async (values: any) => {
    const res = await RegisterRequest(values);

    if (res) {
      GetMe(dispatch);
      pushUser(router, "/", "register success");
    } else {
      setTimeout(() => {
        nameInputRef?.current && nameInputRef.current.focus();
      }, 1500);
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        passwordAgain: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        errors,
        touched,
        handleSubmit,
        values,
        handleChange,
        handleBlur,
        isValid,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <FlexDiv column gap05>
            <InputLabelContainer
              id="name"
              label="Name"
              error={errors.name && touched.name ? errors.name : undefined}
            >
              <Input
                autoComplete="name"
                id="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                name="name"
                isInvalid={!!errors.name && touched.name}
                ref={nameInputRef}
                isRequired
              />
            </InputLabelContainer>

            <InputLabelContainer
              id="email"
              label="Email"
              error={errors.email && touched.email ? errors.email : undefined}
            >
              <Input
                autoComplete="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.email && touched.email}
                isRequired
              />
            </InputLabelContainer>

            <InputLabelContainer
              id="password"
              label="Password"
              error={errors.password && touched.password ? errors.password : undefined}
            >
              <Input
                autoComplete="password"
                type="password"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.password && touched.password}
                isRequired
              />
            </InputLabelContainer>

            <InputLabelContainer
              id="passwordAgain"
              label="Confirm Password"
              error={
                errors.passwordAgain && touched.passwordAgain ? errors.passwordAgain : undefined
              }
            >
              <Input
                autoComplete="new-password"
                type="password"
                id="passwordAgain"
                name="passwordAgain"
                value={values.passwordAgain}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.passwordAgain && touched.passwordAgain}
                isRequired
              />
            </InputLabelContainer>

            <Button
              mt={"0.5rem"}
              type="submit"
              colorScheme="blue"
              disabled={!isValid || isSubmitting}
              isLoading={isSubmitting}
              loadingText="Registering"
            >
              Register
            </Button>
          </FlexDiv>
        </form>
      )}
    </Formik>
  );
};
