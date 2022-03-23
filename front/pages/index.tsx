import { Text, UnorderedList, ListItem } from "@chakra-ui/react";
import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { ProductCard } from "../components/Card";
import { MainGrid, VerticalGrid } from "../components/Containers";
import { Layout } from "../components/layouts/Layout";
import { styled } from "../stitches.config";
import { ShowCaseProduct } from "../types";
import { apiBase } from "../utils/envs";

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

const A = styled("a", {
  userSelect: "none",
  display: "flex",
});

const Home: NextPage<Result> = ({ products }) => {
  return (
    <Layout>
      <MainGrid>
        {[1, 2, 3, 4, 5].map((i) => (
          <>
            <Text key={i} fontSize="4xl">
              test-title
            </Text>
            <VerticalGrid key={i} style={{ display: "flex" }}>
              {products.map((product) => (
                <A href="" key={product.id}>
                  <ProductCard>
                    <img
                      draggable={false}
                      width={100}
                      src="https://cdn.verk.net/cdn-cgi/image/w=375,h=234,fit=scale-down,q=75,f=auto,sharpen=0.5/images/87/2_492903-1192x2352.jpeg"
                    />
                    <Text fontSize="3xl">{product.name}</Text>
                    <Text>{product.description}</Text>
                    <UnorderedList>
                      {product.importantBulletpoints.map((bulletpoint) => (
                        <ListItem key={bulletpoint.id}>{bulletpoint.text}</ListItem>
                      ))}
                    </UnorderedList>
                  </ProductCard>
                </A>
              ))}
            </VerticalGrid>
          </>
        ))}
      </MainGrid>
    </Layout>
  );
};

export default Home;
