import { ComponentPropsWithoutRef, FC } from "react";
import { styled } from "../stitches.config";
import { Label } from "./Text";

export const FormWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",

  gap: "1rem",
  paddingTop: "1.75rem",
});

export const VerticalGrid = styled("div", {
  overflowX: "auto",
  display: "flex",
  gap: "1rem",
  paddingBottom: "0.5rem",
});

export const MainGrid = styled("div", {
  display: "flex",
  gap: "1rem",
});

export const FlexDiv = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "1rem",

  variants: {
    column: {
      true: {
        flexDirection: "column",
      },
    },
    align: {
      true: {
        alignItems: "center",
      },
    },
    justify: {
      true: {
        justifyContent: "center",
      },
    },
    spaceBetween: {
      true: {
        justifyContent: "space-between",
      },
    },
    flexEnd: {
      true: {
        justifyContent: "flex-end",
      },
    },
    flexStart: {
      true: {
        justifyContent: "flex-start",
      },
    },
    gap05: {
      true: {
        gap: "0.5rem",
      },
    },
    gap0: {
      true: {
        gap: 0,
      },
    },
    fullWidth: {
      true: {
        width: "100%",
      },
    },

    fullHeight: {
      true: {
        height: "100%",
      },
    },
  },
});

interface InputLabelContainerProps extends ComponentPropsWithoutRef<"div"> {
  label: string;
  id: string;
  row?: boolean;
}

export const InputLabelContainer: FC<InputLabelContainerProps> = ({
  label,
  id,
  children,
  row,
  style,
}) => {
  return (
    <FlexDiv gap0 align={row} column={!row} style={style} fullWidth>
      <Label htmlFor={id} style={{ paddingBottom: "0.2rem" }}>
        {label}
      </Label>
      {children}
    </FlexDiv>
  );
};

export const MgmtSettingsPageScrollableContent = styled("div", {
  overflowY: "auto",
  maxHeight: "calc(100vh - 14rem)",
  padding: "0 2rem",
  paddingTop: "1rem",
  paddingBottom: "1.5rem",
});
