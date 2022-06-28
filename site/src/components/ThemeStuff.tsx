import { useHotkeys } from "@mantine/hooks";
import { ThemeProvider, useTheme } from "next-themes";
import { ReactNode } from "react";

import { darkTheme } from "@ecommerce/ui";

interface Props {
  children: ReactNode;
}

export const ThemeStuff = ({ children }: Props) => (
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    enableColorScheme={false}
    value={{ light: "light", dark: darkTheme.className }}
  >
    <HandleSystemThemeChange>{children}</HandleSystemThemeChange>
  </ThemeProvider>
);

const HandleSystemThemeChange = ({ children }: Props) => {
  const { setTheme, resolvedTheme } = useTheme();

  useHotkeys([
    ["mod+j", () => setTheme(resolvedTheme === "light" ? "dark" : "light")],
  ]);

  return <>{children}</>;
};
