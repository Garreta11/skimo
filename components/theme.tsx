'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ThemeContextType {
  menu: boolean;
  setMenu: (menu: boolean) => void;
  isScreenSmall: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [menu, setMenu] = useState(false);
  const [isScreenSmall, setIsScreenSmall] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSmall(window.innerWidth <= 971);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        menu,
        setMenu,
        isScreenSmall
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

