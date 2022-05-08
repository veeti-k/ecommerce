import { Button, Input, Select } from "@chakra-ui/react";
import { Formik } from "formik";
import { useContext } from "react";
import { BreakpointContext } from "../../BreakpointProvider/BreakpointProvider";
import { Category } from "../../types/Category";
import { FlexDiv, InputLabelContainer } from "../Containers";
import * as Yup from "yup";
import { useBlurCounter } from "../../hooks/useBlurCounter";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  parent: Yup.string().optional(),
});

interface Props {
  onSubmit: (values: any) => any;
  categories: Category[];
}

export const NewCategoryForm = ({ onSubmit, categories }: Props) => {
  const { state: bpState } = useContext(BreakpointContext);

  const mobile = bpState.bp === "mobile";

  const { addBlurCount, blurCount } = useBlurCounter();

  return (
    <Formik
      initialValues={{
        name: "",
        parent: "",
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        handleSubmit,
        handleBlur,
        values,
        handleChange,
        isSubmitting,
        errors,
        dirty,
        touched,
        isValid,
      }) => (
        <form onSubmit={handleSubmit}>
          <FlexDiv column>
            <InputLabelContainer
              id="name"
              label="Name"
              error={errors.name && touched.name ? errors.name : undefined}
            >
              <Input
                autoComplete="off"
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
              id="parent"
              label="Parent"
              error={errors.parent && touched.parent ? errors.parent : undefined}
            >
              <Select
                id="parent"
                name="parent"
                value={values.parent}
                onChange={handleChange}
                isInvalid={!!errors.parent && touched.parent}
              >
                <option value="">None</option>
                {categories.map((category) => {
                  const parent = categories.find((c) => c.categoryId == category.parentId);

                  return (
                    <option key={category.categoryId} value={category.categoryId}>
                      {category.name} {parent ? `- (${parent.name})` : ""}
                    </option>
                  );
                })}
              </Select>
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
