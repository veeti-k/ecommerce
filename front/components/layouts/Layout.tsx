import Head from "next/head";
import { FC } from "react";
import { useGetMe } from "../../hooks/useGetMe";
import { styled } from "../../stitches.config";
import { ResolvedCategory } from "../../types/Category";
import { Menubar } from "../Menubar/Menubar";

const Main = styled("main", {
  maxWidth: "1200px",
  margin: "0 auto",
  position: "relative",
  padding: "0 1rem",
  paddingTop: "4.5rem",
  paddingBottom: "1rem",
  zIndex: 1,

  "@mobileAndUp": {
    padding: "0 25px",
    paddingTop: "6rem",
  },

  variants: {
    noPadding: {
      true: {
        paddingTop: "3.5rem",

        "@mobileAndUp": {
          paddingTop: "5rem",
        },
      },
    },
    lessPaddingOnMobile: {
      true: {
        padding: 0,

        "@mobileAndUp": {
          padding: "0 25px",
          paddingTop: "6rem",
        },
      },
    },
  },

  compoundVariants: [
    {
      noPadding: true,
      lessPaddingOnMobile: true,

      css: {
        paddingTop: "3.5rem",

        "@mobileAndUp": {
          padding: "0 25px",
          paddingTop: "5rem",
        },
      },
    },
  ],
});

type LayoutProps = {
  title?: string;
  categories: ResolvedCategory[];
  noPadding?: boolean;
  lessPaddingOnMobile?: boolean;
};

export const Layout: FC<LayoutProps> = ({
  children,
  title,
  categories,
  noPadding,
  lessPaddingOnMobile,
}) => {
  useGetMe();

  return (
    <>
      <Head>
        <title>{title ?? "DEMO"}</title>
      </Head>
      <Menubar categories={categories} lessPaddingOnMobile={lessPaddingOnMobile} />
      <Main noPadding={noPadding} lessPaddingOnMobile={lessPaddingOnMobile}>
        {children}
      </Main>
    </>
  );
};
