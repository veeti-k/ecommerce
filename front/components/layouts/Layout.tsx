import Head from "next/head";
import { FC } from "react";
import { useGetMe } from "../../hooks/useGetMe";
import { styled } from "../../stitches.config";
import { ResolvedCategory } from "../../types";
import { Menubar } from "../Menubar/Menubar";

const Main = styled("main", {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 25px",
  position: "relative",
  paddingTop: "6rem",
  zIndex: 1,
});

type LayoutProps = {
  title?: string;
  categories: ResolvedCategory[];
};

export const Layout: FC<LayoutProps> = ({ children, title, categories }) => {
  useGetMe();

  return (
    <>
      <Head>
        <title>{title ?? "DEMO"}</title>
      </Head>
      <Menubar categories={categories} />
      <Main>{children}</Main>
    </>
  );
};
