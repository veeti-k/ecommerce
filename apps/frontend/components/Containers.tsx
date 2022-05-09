import { ComponentPropsWithoutRef, FC, ReactNode, useContext } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { BreakpointContext } from "../BreakpointProvider/BreakpointProvider";
import { styled } from "../stitches.config";
import { Label } from "./Text";

export const FlexDiv = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "0.8rem",

  "@mobileAndUp": {
    gap: "1rem",
  },

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
    gap08: {
      true: {
        gap: "0.8rem",
      },
    },
    gap0: {
      true: {
        gap: "0",
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
  error?: string;
}

export const InputLabelContainer: FC<InputLabelContainerProps> = ({
  label,
  id,
  children,
  row,
  style,
  error,
}) => (
  <FlexDiv gap0 align={row} column={!row} style={style} fullWidth>
    <FlexDiv fullWidth spaceBetween style={{ paddingBottom: "0.2rem" }}>
      <Label htmlFor={id}>{label}</Label>
      <Label htmlFor={id} style={{ color: "red" }} noMargin>
        {error}
      </Label>
    </FlexDiv>
    {children}
  </FlexDiv>
);

export const MgmtSettingsPageScrollableContent = styled("div", {
  overflowY: "auto",
});

export const CardContentWrapper: FC<{ children: ReactNode; scrollableMaxHeigth?: string }> = ({
  children,
  scrollableMaxHeigth,
}) => {
  const { state } = useContext(BreakpointContext);

  if (state.bp === "mobile") return <>{children}</>;

  return (
    <MgmtSettingsPageScrollableContent style={{ maxHeight: scrollableMaxHeigth }}>
      {children}
    </MgmtSettingsPageScrollableContent>
  );
};

export const HorizontalProductList: FC<{ children: ReactNode }> = ({ children }) => (
  <ScrollContainer hideScrollbars={false}>
    <FlexDiv
      gap05
      style={{
        paddingLeft: "0.5rem",
        paddingBottom: "0.5rem",
        paddingTop: "0.5rem",
        paddingRight: "1.5rem",
      }}
    >
      {children}
    </FlexDiv>
  </ScrollContainer>
);
