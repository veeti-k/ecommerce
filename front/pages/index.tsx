import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { MainGrid } from "../components/Containers";
import { Layout } from "../components/layouts/Layout";
import { TallProduct } from "../components/Product/TallProduct";
import { ResolvedCategory, ShowCaseProduct } from "../types";
import { getCategories_STATIC_PROPS, getIndexProducts_STATIC_PROPS } from "../utils/getStaticProps";

type Result = {
  products: ShowCaseProduct[];
  categories: ResolvedCategory[];
};

// prettier-ignore
export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<Result>> => {
  const products = await getIndexProducts_STATIC_PROPS();
  const categories = await getCategories_STATIC_PROPS();

  return {
    props: {
      products,
      categories
    },
  };
};

const Home: NextPage<Result> = ({ products, categories }) => {
  return (
    <Layout categories={categories}>
      <MainGrid>
        {products.map((product) => (
          <TallProduct product={product} key={product.id} />
        ))}
      </MainGrid>
    </Layout>
  );
};

export default Home;
