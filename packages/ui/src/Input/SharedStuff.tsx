import { css, styled } from "../stitches.config";

const inputStyles = css({
  all: "unset",

  transition: "$default",

  fontSize: "16px",

  borderRadius: 8,
  border: "1px solid $colors$gray7",

  display: "flex",
  alignItems: "center",

  height: "2.5rem",
  padding: "0 0.8rem",

  "@hover": {
    "&:hover": {
      borderColor: "$colors$gray9",
    },
  },

  "&:focus": {
    outline: "none",
    boxShadow: "$focusVisible",
    borderColor: "$colors$blue9",
  },

  variants: {
    fullWidth: {
      true: {
        width: "100%",
      },
    },

    invalid: {
      true: {
        borderColor: "$tomato8",

        "@hover": {
          "&:hover": {
            borderColor: "$colors$tomato9",
          },
        },

        "&:focus": {
          outline: "none",
          boxShadow: `0 0 0 3px $colors$tomato8`,
          borderColor: "$colors$tomato9",
        },
      },
    },
  },
});

export const StyledInput = styled("input", inputStyles);
export const StyledTextArea = styled("textarea", inputStyles);

export interface SharedInputProps {
  label?: string;
  error?: string | React.ReactNode;
  fullWidth?: boolean;
}

export type InputProps = SharedInputProps &
  React.InputHTMLAttributes<HTMLInputElement>;

export type TextAreaProps = SharedInputProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;
