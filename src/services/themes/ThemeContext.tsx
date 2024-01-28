// themeContext.js
import React, { createContext, useContext, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {CssBaseline, PaletteMode} from '@mui/material';

type ThemeContextType = {
  toggleTheme: () => void,
  mode: PaletteMode
}

const ThemeContext = createContext<ThemeContextType>(null);

export const useThemeContext = () => useContext(ThemeContext);

const CustomThemeProvider = ({ children }: {children: React.ReactNode}) => {
  const [mode, setMode] = useState<PaletteMode>('dark');

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default CustomThemeProvider;
