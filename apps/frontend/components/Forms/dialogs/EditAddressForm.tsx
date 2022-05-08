import { Formik } from "formik";
import { useContext } from "react";
import { BreakpointContext } from "../../../BreakpointProvider/BreakpointProvider";
import { Address } from "../../../types/User";
import * as Yup from "yup";
import { validation } from "shared2";
import { FlexDiv, InputLabelContainer } from "../../Containers";
import { Button, Input } from "@chakra-ui/react";

const validationSchema = Yup.object().shape({
  name: validation.nameSchema,
  phoneNumber: validation.phoneNumberSchema,
  email: validation.emailSchema,
  streetAddress: validation.streetAddressSchema,
  city: validation.citySchema,
  state: validation.stateSchema,
  zip: validation.zipSchema,
});

interface Props {
  onSubmit: (values: any) => any;
  address: Address;
}

export const EditAddressForm = ({ onSubmit, address }: Props) => {
  const { state: bpState } = useContext(BreakpointContext);

  const mobile = bpState.bp === "mobile";

  return (
    <Formik
      initialValues={{
        name: address.name,
        phoneNumber: address.phoneNumber,
        email: address.email,
        streetAddress: address.streetAddress,
        city: address.city,
        state: address.state,
        zip: address.zip,
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        handleSubmit,
        handleBlur,
        handleChange,
        values,
        isSubmitting,
        isValid,
        errors,
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
                type="name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
              />
            </InputLabelContainer>

            <InputLabelContainer
              id="phoneNumber"
              label="Phone Number"
              error={errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : undefined}
            >
              <Input
                autoComplete="tel"
                id="phoneNumber"
                type="tel"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNumber}
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
                type="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
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
                isDisabled={!isValid || isSubmitting}
                isLoading={isSubmitting}
                isFullWidth={mobile}
                loadingText="Saving"
                mb={"0.8rem"}
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
