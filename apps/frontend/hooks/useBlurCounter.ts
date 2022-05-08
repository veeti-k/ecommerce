import { useState } from "react";

export const useBlurCounter = () => {
  const [blurCount, setBlurCount] = useState(0);

  const addBlurCount = () => {
    setBlurCount(blurCount + 1);
  };

  return { blurCount, addBlurCount };
};
