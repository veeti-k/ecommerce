import { Button, Input } from "@chakra-ui/react";
import { Formik } from "formik";
import { useContext } from "react";
import toast from "react-hot-toast";
import { validation } from "shared2";
import * as Yup from "yup";
import { BreakpointContext } from "../../BreakpointProvider/BreakpointProvider";
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

  const mobile = bpState.bp === "mobile";

  const onSubmit = async (values: any) => {
    const notifId = toast.loading("Saving your edits");

    const res = await UpdateAccountRequest(values);

    toast.dismiss(notifId);

    if (res) {
      toast.success("Account settings updated successfully!");
      dispatch({ type: Actions.SetUser, payload: res.data });
    }
  };

  return (
    <Formik initialValues={state} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit, values, handleChange, isSubmitting, dirty }) => (
        <form onSubmit={handleSubmit}>
          <FlexDiv column gap08={mobile}>
            <InputLabelContainer id="name" label="Name">
              <Input
                autoComplete="name"
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                isRequired
              />
            </InputLabelContainer>

            <FlexDiv column={mobile} gap08={mobile}>
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

              <InputLabelContainer id="phone-number" label="Phone number">
                <Input
                  autoComplete="phoneNumber"
                  id="phone-number"
                  name="phoneNumber"
                  value={values.phoneNumber ?? ""}
                  onChange={handleChange}
                  isRequired
                />
              </InputLabelContainer>
            </FlexDiv>
            <FlexDiv flexEnd>
              <Button
                colorScheme="blue"
                disabled={!dirty || isSubmitting}
                type="submit"
                isLoading={isSubmitting}
                isFullWidth={mobile}
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
