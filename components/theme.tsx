'use client';

import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext({});

export const ThemeContextProvider = ({ children }) => {
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

export const useThemeContext = () => useContext(ThemeContext);
