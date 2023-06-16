"use client";

import { createContext, ReactNode, useState } from "react";

interface SearchContextProps {
  setSearch: (search: string) => void;
  search: string;
}

export const SearchContext = createContext<SearchContextProps | undefined>(
  undefined
);

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
