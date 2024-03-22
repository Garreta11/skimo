'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  menu: boolean;
  setMenu: (menu: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [menu, setMenu] = useState(false);

  return (
    <ThemeContext.Provider
      value={{
        menu,
        setMenu
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// export const useThemeContext = () => useContext(ThemeContext);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider');
  }
  return context;
};

