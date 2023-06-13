"use client";

import { createContext, ReactNode, useState } from "react";

interface ThemeContextProps {
  toggle: () => void;
  isDark: boolean;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDark, setIsDark] = useState<boolean>(false);

  const toggle = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ toggle, isDark }}>
      <div
        className={`transition duration-500 ${isDark && "bg-black text-white"}`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
