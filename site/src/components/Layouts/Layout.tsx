import Head from "next/head";
import { ReactNode } from "react";

import { Menubar } from "../Menubar/Menubar";
import { LayoutMain } from "./Layout.styles";

interface Props {
  children: ReactNode;
  title: string;
}

export const Layout = ({ children, title }: Props) => (
  <>
    <Head>
      <title>{`${title} - veetik/ecommerce`}</title>
    </Head>

    <Menubar />

    <LayoutMain>{children}</LayoutMain>
  </>
);
