import Head from "next/head";
import { FC } from "react";
import { useGetMe } from "../../hooks/useGetMe";
import { useResizeListener } from "../../hooks/useResizeListener";
import { styled } from "../../stitches.config";
import { ResolvedCategory } from "../../types/Category";
import { Menubar } from "../Menubar/Menubar";

const Main = styled("main", {
  maxWidth: "1200px",
  margin: "0 auto",
  position: "relative",
  paddingTop: "3.5rem",
  paddingBottom: "1rem",
  zIndex: 1,

  "@mobileAndUp": {
    paddingLeft: "0.7rem",
    paddingRight: "0.7rem",
    paddingTop: "4.5rem",
  },

  "@tabletAndUp": {
    paddingLeft: "25px",
    paddingRight: "25px",
    paddingTop: "6rem",
  },

  variants: {
    noPadding: {
      true: {
        paddingTop: "3.5rem",
        paddingBottom: "1rem",

        "@mobileAndUp": {
          paddingTop: "5rem",
          paddingBottom: "1rem",
        },
      },
    },
  },
});

type LayoutProps = {
  title?: string;
  categories: ResolvedCategory[];
  noPadding?: boolean;
};

export const Layout: FC<LayoutProps> = ({ children, title, categories, noPadding }) => {
  useGetMe();
  useResizeListener();

  return (
    <>
      <Head>
        <title>{title ?? "DEMO"}</title>
      </Head>
      <Menubar categories={categories} />
      <Main noPadding={noPadding}>{children}</Main>
    </>
  );
};
