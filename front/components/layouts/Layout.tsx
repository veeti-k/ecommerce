import Head from "next/head";
import { FC } from "react";
import { Menubar } from "../Menubar/Menubar";

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
      <main></main>
    </>
  );
};
