import { Formik } from "formik";
import { useContext } from "react";
import { BreakpointContext } from "../../BreakpointProvider/BreakpointProvider";
import * as Yup from "yup";
import { validation } from "shared2";
import { FlexDiv } from "../Containers";
import { Button } from "@chakra-ui/react";
import { PasswordInputWithLabel } from "../Inputs";

const validationSchema = Yup.object().shape({
  currentPassword: validation.passwordSchema,
  newPassword: validation.passwordSchema,
  confirmPassword: validation.passwordAgainSchema,
});

interface Props {
  onSubmit: (values: any) => any;
}

export const PasswordChangeForm = ({ onSubmit }: Props) => {
  const { state: bpState } = useContext(BreakpointContext);

  const mobile = bpState.bp === "mobile";

  return (
    <Formik
      initialValues={{
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        handleSubmit,
        values,
        handleChange,
        isSubmitting,
        errors,
        touched,
        handleBlur,
        isValid,
        dirty,
      }) => (
        <form onSubmit={handleSubmit}>
          <FlexDiv column>
            <PasswordInputWithLabel
              id="current-password"
              label="Current password"
              error={
                errors.currentPassword && touched.currentPassword
                  ? errors.currentPassword
                  : undefined
              }
              inputIsInvalid={!!errors.currentPassword && touched.currentPassword}
              autoComplete="current-password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.currentPassword}
              name="currentPassword"
            />

            <PasswordInputWithLabel
              id="new-password"
              label="New password"
              error={errors.newPassword && touched.newPassword ? errors.newPassword : undefined}
              inputIsInvalid={!!errors.newPassword && touched.newPassword}
              autoComplete="new-password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.newPassword}
              name="newPassword"
            />

            <PasswordInputWithLabel
              id="confirm-password"
              label="Confirm password"
              error={
                errors.confirmPassword && touched.confirmPassword
                  ? errors.confirmPassword
                  : undefined
              }
              inputIsInvalid={!!errors.confirmPassword && touched.confirmPassword}
              autoComplete="new-password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
              name="confirmPassword"
            />

            <FlexDiv flexEnd>
              <Button
                colorScheme="blue"
                type="submit"
                isDisabled={!isValid || !dirty || isSubmitting}
                isLoading={isSubmitting}
                isFullWidth={mobile}
                loadingText="Changing"
                mb={"0.8rem"}
              >
                Change password
              </Button>
            </FlexDiv>
          </FlexDiv>
        </form>
      )}
    </Formik>
  );
};
