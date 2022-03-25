import Head from "next/head";
import { FC } from "react";
import { styled } from "../../stitches.config";
import { Menubar } from "../Menubar/Menubar";

const Main = styled("main", {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 25px",
  position: "relative",
  paddingTop: "6rem",
  zIndex: 1,
});

type Props = {
  title?: string;
};

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title ?? "DEMO"}</title>
      </Head>
      <Menubar />
      <Main>{children}</Main>
    </>
  );
};
