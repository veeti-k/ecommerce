import type { NextPage } from "next";
import { useContext } from "react";
import { Layout } from "../components/layouts/Layout";
import { GlobalStateContext } from "../globalState/store";
import { useGetMe } from "../hooks/useGetMe";

const Home: NextPage = () => {
  useGetMe();
  const { state } = useContext(GlobalStateContext);

  return (
    <Layout>
      <h1>Hello {state?.user?.firstName}</h1>
    </Layout>
  );
};

export default Home;
