import Link from "next/link";
import { useRouter } from "next/router";
import { ComponentPropsWithoutRef, FC, MouseEvent } from "react";
import { styled } from "../stitches.config";
import { pushUser } from "../utils/router";
import { routes } from "../utils/routes";
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
  flexDirection: "column",
  gap: "1rem",
});

export const FlexDiv = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "1rem",
  width: "100%",

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
    <FlexDiv gap0 align={row} column={!row} style={style}>
      <Label htmlFor={id} style={{ paddingBottom: "0.2rem" }}>
        {label}
      </Label>
      {children}
    </FlexDiv>
  );
};

export const PageTitleContainer: FC = ({ children }) => (
  <FlexDiv spaceBetween align style={{ paddingTop: "0.5rem", paddingBottom: "1rem" }}>
    {children}
  </FlexDiv>
);

export const PageSelectorButtons = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  padding: "1rem",
  backgroundColor: "white",
  borderTopLeftRadius: "8px",
  borderBottomLeftRadius: "8px",
});

const PageSelectorButtonContainer = styled("div", {
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  borderRadius: "4px",
  padding: "0.8rem",
  paddingRight: "5rem",
  paddingLeft: "1rem",
  fontWeight: "light",
  transition: "$buttonHover",

  "&:hover": {
    cursor: "pointer",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },

  variants: {
    active: {
      true: {
        color: "#1e67a5",
        fontWeight: "bold",
      },
    },
  },
});

type PageSelectorButtonProps = {
  active?: boolean;
  route: string;
};

export const PageSelectorButton: FC<PageSelectorButtonProps> = ({ children, active, route }) => {
  const router = useRouter();

  const onClick = (e: MouseEvent, path: string) => {
    e.preventDefault();
    pushUser(router, path, "pageSelectorButton::onClick");
  };

  return (
    <Link href={route}>
      <a onClick={(e) => onClick(e, route)}>
        <PageSelectorButtonContainer active={active}>{children}</PageSelectorButtonContainer>
      </a>
    </Link>
  );
};
