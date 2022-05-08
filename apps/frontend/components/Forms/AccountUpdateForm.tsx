import { Button, Input } from "@chakra-ui/react";
import { Formik } from "formik";
import { useContext } from "react";
import toast from "react-hot-toast";
import { validation } from "shared2";
import * as Yup from "yup";
import { BreakpointContext } from "../../BreakpointProvider/BreakpointProvider";
import { useBlurCounter } from "../../hooks/useBlurCounter";
import { UserContext } from "../../UserProvider/provider";
import { Actions } from "../../UserProvider/types";
import { UpdateAccountRequest } from "../../utils/Requests/Account";
import { FlexDiv, InputLabelContainer } from "../Containers";

const validationSchema = Yup.object().shape({
  name: validation.nameSchema,
  email: validation.emailSchema,
  phoneNumber: validation.phoneNumberSchema,
});

export const AccountUpdateForm = () => {
  const { dispatch, state } = useContext(UserContext);
  const { state: bpState } = useContext(BreakpointContext);
  const { addBlurCount, blurCount } = useBlurCounter();

  const mobile = bpState.bp === "mobile";

  const onSubmit = (values: any) =>
    toast.promise(
      (async () => {
        const res = await UpdateAccountRequest(values);

        if (res) dispatch({ type: Actions.SetUser, payload: res.data });
      })(),
      {
        loading: "Saving your edits",
        success: "Saved!",
        error: "Failed to save your edits",
      }
    );

  return (
    <Formik initialValues={state} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({
        handleSubmit,
        handleBlur,
        values,
        handleChange,
        isSubmitting,
        dirty,
        errors,
        isValid,
        touched,
      }) => (
        <form onSubmit={handleSubmit}>
          <FlexDiv column>
            <InputLabelContainer
              id="name"
              label="Name"
              error={errors.name && touched.name ? errors.name : undefined}
            >
              <Input
                autoComplete="name"
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                isRequired
                isInvalid={!!errors.name && touched.name}
                onBlur={(e) => {
                  addBlurCount();
                  if (blurCount !== 1) return;
                  handleBlur(e);
                }}
              />
            </InputLabelContainer>

            <FlexDiv column={mobile}>
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
                  isRequired
                  onBlur={handleBlur}
                  isInvalid={!!errors.email && touched.email}
                />
              </InputLabelContainer>

              <InputLabelContainer
                id="phone-number"
                label="Phone number"
                error={errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : undefined}
              >
                <Input
                  autoComplete="tel"
                  id="phone-number"
                  name="phoneNumber"
                  value={values.phoneNumber ?? ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.phoneNumber && touched.phoneNumber}
                />
              </InputLabelContainer>
            </FlexDiv>
            <FlexDiv flexEnd>
              <Button
                colorScheme="blue"
                disabled={!dirty || !isValid || isSubmitting}
                type="submit"
                isLoading={isSubmitting}
                isFullWidth={mobile}
                loadingText="Saving"
              >
                Save
              </Button>
            </FlexDiv>
          </FlexDiv>
        </form>
      )}
    </Formik>
  );
};
