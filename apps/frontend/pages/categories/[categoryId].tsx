import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { Card, PageCardContent } from "../../components/Card";
import { FlexDiv } from "../../components/Containers";
import { Layout } from "../../components/layouts/Layout";
import { PageTitleContainer } from "../../components/layouts/Styles";
import { WideProduct } from "../../components/Product/WideProduct";
import { PageTitle } from "../../components/Text";
import { ResolvedCategory } from "../../types/Category";
import { Product } from "../../types/Product";
import { STATIC_PROPS_REQUESTS } from "../../utils/getStaticProps";

const CategoryProducts: NextPage<Result> = ({ products, resolvedCategories, category }) => {
  return (
    <Layout categories={resolvedCategories}>
      <PageTitleContainer>
        <PageTitle>{category.name}</PageTitle>
      </PageTitleContainer>

      <Card shadowFar>
        <PageCardContent>
          <FlexDiv column gap05>
            {products.map((product) => (
              <WideProduct product={product} key={product.productId} />
            ))}
          </FlexDiv>
        </PageCardContent>
      </Card>
    </Layout>
  );
};

export default CategoryProducts;

type Result = {
  products: Product[];
  resolvedCategories: ResolvedCategory[];
  category: ResolvedCategory;
};

// prettier-ignore
export const getStaticProps: GetStaticProps = async (context): Promise<GetStaticPropsResult<Result>> => {
  const categoryId = context.params!.categoryId! as string;

  const products = await STATIC_PROPS_REQUESTS.Products.getByCategoryId(Number(categoryId));
  const resolvedCategories = await STATIC_PROPS_REQUESTS.Categories.getAllResolved();

  const category = await STATIC_PROPS_REQUESTS.Categories.getById(Number(categoryId));

  if (!category) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      products,
      resolvedCategories,
      category
    },
  };
};

export const getStaticPaths = async () => {
  const categories = await STATIC_PROPS_REQUESTS.Categories.getAll();

  return {
    paths: categories.map((category) => ({
      params: {
        categoryId: category.categoryId.toString(),
      },
    })),
    fallback: false,
  };
};
