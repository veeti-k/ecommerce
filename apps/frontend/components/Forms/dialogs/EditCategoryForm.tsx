import { Input, Select, Button } from "@chakra-ui/react";
import { Formik } from "formik";
import { useContext } from "react";
import { BreakpointContext } from "../../../BreakpointProvider/BreakpointProvider";
import { useBlurCounter } from "../../../hooks/useBlurCounter";
import { Category } from "../../../types/Category";
import { FlexDiv, InputLabelContainer } from "../../Containers";
import * as Yup from "yup";
import { validation } from "shared2";

const validationSchema = Yup.object().shape({
  name: validation.nameSchema,
  parentId: validation.parentIdSchema,
});

interface Props {
  onSubmit: (values: any) => any;
  categories: Category[];
  category: Category;
}

export const EditCategoryForm = ({ onSubmit, categories, category }: Props) => {
  const { state: bpState } = useContext(BreakpointContext);

  const mobile = bpState.bp === "mobile";

  const { addBlurCount, blurCount } = useBlurCounter();

  return (
    <Formik
      initialValues={{
        name: category.name,
        parentId: category.parentId?.toString() || "",
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
              error={errors.parentId && touched.parentId ? errors.parentId : undefined}
            >
              <Select
                id="parent-id"
                name="parentId"
                value={values.parentId || ""}
                onChange={handleChange}
                isInvalid={!!errors.parentId && touched.parentId}
              >
                <option value="">None</option>
                {categories.map((innerCategory) => {
                  const parent = categories.find((c) => c.categoryId == innerCategory.parentId);
                  const isAlreadyParent = innerCategory.categoryId === category.parentId;
                  const isItself = innerCategory.categoryId === category.categoryId;
                  const disabled = isAlreadyParent || isItself;

                  return (
                    <option
                      key={innerCategory.categoryId}
                      value={innerCategory.categoryId}
                      disabled={disabled}
                    >
                      {innerCategory.name} {parent ? `- (${parent.name})` : ""}
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
                loadingText="Editing"
                mb={"0.8rem"}
              >
                Edit
              </Button>
            </FlexDiv>
          </FlexDiv>
        </form>
      )}
    </Formik>
  );
};
