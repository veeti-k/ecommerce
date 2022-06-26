import { darkTheme } from "@ecommerce/ui";
import { ThemeProvider, useTheme } from "next-themes";
import { ReactNode, useEffect } from "react";

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
  const { setTheme, systemTheme } = useTheme();

  useEffect(() => {
    const systemNext = systemTheme === "light" ? "light" : "dark";
    setTheme(systemNext);
  }, [systemTheme]);

  return <>{children}</>;
};
