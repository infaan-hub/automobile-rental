import { ThemeProvider as NextThemesProvider } from "next-themes";

function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

export { ThemeProvider };
