import { Button, Input, Select } from "@chakra-ui/react";
import { Formik } from "formik";
import { useContext } from "react";
import { Category } from "shared";
import { validation } from "shared2";
import * as Yup from "yup";
import { BreakpointContext } from "../../../BreakpointProvider/BreakpointProvider";
import { useBlurCounter } from "../../../hooks/useBlurCounter";
import { FlexDiv, InputLabelContainer } from "../../Containers";

const validationSchema = Yup.object().shape({
  name: validation.nameSchema,
  parentId: validation.parentIdSchema,
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
        parentId: "",
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
              id="parentId"
              label="parentId"
              error={errors.parentId && touched.parentId ? errors.parentId : undefined}
            >
              <Select
                id="parentId"
                name="parentId"
                value={values.parentId}
                onChange={handleChange}
                isInvalid={!!errors.parentId && touched.parentId}
              >
                <option value="">None</option>
                {categories.map((category) => {
                  const parentId = categories.find((c) => c.categoryId == category.parentId);

                  return (
                    <option key={category.categoryId} value={category.categoryId}>
                      {category.name} {parentId ? `- (${parentId.name})` : ""}
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