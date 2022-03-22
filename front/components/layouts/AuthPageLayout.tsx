import Head from "next/head";
import { FC } from "react";
import { styled } from "../../stitches.config";

type Props = {
  title?: string;
};

const ChildrenCentered = styled("div", {
  height: "100vh",
  paddingLeft: "calc(100vw - 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const AuthPageLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title ?? "DEMO"}</title>
      </Head>
      <ChildrenCentered>{children}</ChildrenCentered>
    </>
  );
};
