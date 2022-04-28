import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { Layout } from "../components/layouts/Layout";
import { ResolvedCategory } from "../types/Category";
import { STATIC_PROPS_REQUESTS } from "../utils/getStaticProps";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/bundle";
import { useEffect, useState } from "react";
import { request } from "../utils/requests";
import { TallProduct } from "../components/Product/TallProduct";

const Home: NextPage<Result> = ({ resolvedCategories }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await request({
        path: "/search/products?query=tes",
        method: "GET",
      });

      if (res) setProducts(res.data);
    })();
  }, []);

  if (!products.length) return null;

  return (
    <Layout categories={resolvedCategories}>
      <Swiper slidesPerView={4} spaceBetween={16} autoHeight style={{ padding: "1rem" }}>
        <SwiperSlide>
          <TallProduct product={products[0]} />
        </SwiperSlide>
        <SwiperSlide>
          <TallProduct product={products[0]} />
        </SwiperSlide>
        <SwiperSlide>
          <TallProduct product={products[0]} />
        </SwiperSlide>
        <SwiperSlide>
          <TallProduct product={products[0]} />
        </SwiperSlide>
        <SwiperSlide>
          <TallProduct product={products[0]} />
        </SwiperSlide>
        <SwiperSlide>
          <TallProduct product={products[0]} />
        </SwiperSlide>
        <SwiperSlide>
          <TallProduct product={products[0]} />
        </SwiperSlide>
        <SwiperSlide>
          <TallProduct product={products[0]} />
        </SwiperSlide>
      </Swiper>
    </Layout>
  );
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
