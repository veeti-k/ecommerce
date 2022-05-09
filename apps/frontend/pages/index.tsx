import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { Layout } from "../components/layouts/Layout";
import { ResolvedCategory } from "../types/Category";
import { STATIC_PROPS_REQUESTS } from "../utils/getStaticProps";

const Home: NextPage<Result> = ({ resolvedCategories }) => {
  return <Layout categories={resolvedCategories}></Layout>;
};

export default Home;

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
