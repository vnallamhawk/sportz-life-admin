import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// export const ThemeContext = createContext({
//   themeMode: "Light",
//   darkTheme: () => {},
//   lightTheme: () => {},
// });

// export const ThemeProvider = ThemeContext.Provider;

// export default function useTheme() {
//   return useContext(ThemeContext);
// }

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

interface IProps {
  children: ReactNode;
}

// export const ThemeContext = createContext<ThemeContextType | null>(null);
export const ThemeContext = createContext<ThemeContextType | null>(null);
const ThemeContextProvider = ({ children }: IProps) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, []);
  const value = {
    theme,
    toggleTheme,
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
export default ThemeContextProvider;

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("Context must be used within a context provider");
  }
  return context;
};
