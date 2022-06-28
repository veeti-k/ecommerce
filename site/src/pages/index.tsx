import { Page } from "../../types/Page";

const Home: Page = () => {
  return <div>home</div>;
};

Home.requireAuth = false;

export default Home;
