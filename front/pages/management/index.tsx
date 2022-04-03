import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";

import { ManagementPageLayout } from "../../components/layouts/ManagementPageLayout";
import { ResolvedCategory } from "../../types";
import { getCategories_STATIC_PROPS } from "../../utils/getStaticProps";

type Result = {
  categories: ResolvedCategory[];
};

export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<Result>> => {
  const categories = await getCategories_STATIC_PROPS();

  return {
    props: {
      categories,
    },
  };
};

const Dashboard: NextPage<Result> = ({ categories }) => {
  return <ManagementPageLayout categories={categories} />;
};

export default Dashboard;
