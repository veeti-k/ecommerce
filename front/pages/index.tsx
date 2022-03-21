import type { NextPage } from "next";
import { styled } from "../stitches.config";

const TestDiv = styled("div", {
  color: "blue",
});

const Home: NextPage = () => {
  return <TestDiv>ready</TestDiv>;
};

export default Home;
