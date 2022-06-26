import { gray, grayDark } from "@radix-ui/colors";
import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";

export const ToastStuff = () => {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      toastOptions={{
        duration: 3000,
        position: "top-center",
        style: {
          transition: "all 0.2s ease-in-out",
          backgroundColor: resolvedTheme === "dark" ? grayDark.gray4 : gray.gray4,
          color: resolvedTheme === "dark" ? "white" : "black",
        },
      }}
    />
  );
};
