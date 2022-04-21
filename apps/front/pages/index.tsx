import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { MainGrid } from "../components/Containers";
import { Layout } from "../components/layouts/Layout";
import { ResolvedCategory } from "../types/Category";
import { STATIC_PROPS_REQUESTS } from "../utils/getStaticProps";

type Result = {
  resolvedCategories: ResolvedCategory[];
};

// prettier-ignore
export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<Result>> => {
  const resolvedCategories = await STATIC_PROPS_REQUESTS.Categories.getAllResolved();

  return {
    props: {
      resolvedCategories
    },
  };
};

const Home: NextPage<Result> = ({ resolvedCategories }) => {
  return (
    <Layout categories={resolvedCategories}>
      <MainGrid></MainGrid>
    </Layout>
  );
};

export default Home;
