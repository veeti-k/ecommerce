import { Formik } from "formik";
import { useContext } from "react";
import { BreakpointContext } from "../../BreakpointProvider/BreakpointProvider";
import * as Yup from "yup";
import { validation } from "shared2";
import { FlexDiv, InputLabelContainer } from "../Containers";
import { Button, Input } from "@chakra-ui/react";
import { useBlurCounter } from "../../hooks/useBlurCounter";

const validationSchema = Yup.object().shape({
  name: validation.nameSchema,
  phoneNumber: validation.addressPhoneNumberSchema,
  email: validation.emailSchema,
  streetAddress: validation.streetAddressSchema,
  city: validation.citySchema,
  state: validation.stateSchema,
  zip: validation.zipSchema,
});

interface Props {
  onSubmit: (values: any) => void;
}

export const NewAddressForm = ({ onSubmit }: Props) => {
  const { state: bpState } = useContext(BreakpointContext);

  const mobile = bpState.bp === "mobile";

  const { blurCount, addBlurCount } = useBlurCounter();

  return (
    <Formik
      initialValues={{
        name: "",
        phoneNumber: "",
        email: "",
        streetAddress: "",
        city: "",
        state: "",
        zip: "",
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
                onBlur={(e) => {
                  addBlurCount();
                  if (blurCount !== 1) return;
                  handleBlur(e);
                }}
                isRequired
                isInvalid={!!errors.name && touched.name}
              />
            </InputLabelContainer>

            <InputLabelContainer
              id="phone-number"
              label="Phone Number"
              error={errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : undefined}
            >
              <Input
                autoComplete="tel"
                type="tel"
                id="phone-number"
                name="phoneNumber"
                value={values.phoneNumber ?? ""}
                onChange={handleChange}
                onBlur={handleBlur}
                isRequired
                isInvalid={!!errors.phoneNumber && touched.phoneNumber}
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
                isRequired
                isInvalid={!!errors.email && touched.email}
              />
            </InputLabelContainer>

            <InputLabelContainer
              id="street-address"
              label="Street Address"
              error={
                errors.streetAddress && touched.streetAddress ? errors.streetAddress : undefined
              }
            >
              <Input
                autoComplete="street-address"
                id="street-address"
                name="streetAddress"
                value={values.streetAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                isRequired
                isInvalid={!!errors.streetAddress && touched.streetAddress}
              />
            </InputLabelContainer>

            <InputLabelContainer
              id="city"
              label="City"
              error={errors.city && touched.city ? errors.city : undefined}
            >
              <Input
                autoComplete="address-level2"
                id="city"
                name="city"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                isRequired
                isInvalid={!!errors.city && touched.city}
              />
            </InputLabelContainer>

            <InputLabelContainer
              id="state"
              label="State"
              error={errors.state && touched.state ? errors.state : undefined}
            >
              <Input
                autoComplete="address-level1"
                id="state"
                name="state"
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
                isRequired
                isInvalid={!!errors.state && touched.state}
              />
            </InputLabelContainer>

            <InputLabelContainer
              id="zip"
              label="Zip Code"
              error={errors.zip && touched.zip ? errors.zip : undefined}
            >
              <Input
                autoComplete="postal-code"
                id="zip"
                name="zip"
                value={values.zip}
                onChange={handleChange}
                onBlur={handleBlur}
                isRequired
                isInvalid={!!errors.zip && touched.zip}
              />
            </InputLabelContainer>

            <FlexDiv flexEnd>
              <Button
                colorScheme="blue"
                type="submit"
                isDisabled={!isValid || !dirty || isSubmitting}
                isLoading={isSubmitting}
                isFullWidth={mobile}
                loadingText="Adding"
                mb={"0.8rem"}
              >
                Add
              </Button>
            </FlexDiv>
          </FlexDiv>
        </form>
      )}
    </Formik>
  );
};
