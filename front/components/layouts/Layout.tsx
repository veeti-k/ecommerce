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
  paddingTop: "6rem",
  paddingBottom: "1rem",
  zIndex: 1,

  "@mobileAndUp": {
    padding: "0 25px",
  },

  variants: {
    noPadding: {
      true: {
        paddingTop: "5rem",
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
