import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { MainGrid } from "../components/Containers";
import { Layout } from "../components/layouts/Layout";
import { ShowCaseProduct } from "../types";
import { apiBase } from "../utils/consts";

type Result = {
  products: ShowCaseProduct[];
};

// prettier-ignore
export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<Result>> => {
  const res = await fetch(`${apiBase}/products`);
  const products = (await res.json()) as ShowCaseProduct[];
  
  return {
    props: {
      products,
    },
  };
};

const Home: NextPage<Result> = ({ products }) => {
  return (
    <Layout>
      <MainGrid></MainGrid>
    </Layout>
  );
};

export default Home;
