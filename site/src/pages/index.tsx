import type { NextPage } from "next";

const Home: NextPage = () => {
  return <div>home</div>;
};

(Home as any).auth = true;

export default Home;
