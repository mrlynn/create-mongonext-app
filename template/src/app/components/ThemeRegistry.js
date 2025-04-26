'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeModeContext = createContext({ mode: 'light', toggleMode: () => {} });

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

export default function ThemeRegistry({ children }) {
  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#111111', // black
          },
          secondary: {
            main: '#fafafa', // light gray
          },
          background: {
            default: '#fff',
            paper: '#fff',
          },
          text: {
            primary: '#111',
            secondary: '#444',
          },
        },
        typography: {
          fontFamily: [
            'Inter',
            'system-ui',
            'sans-serif',
          ].join(','),
          h1: { fontWeight: 800, fontSize: '3rem' },
          h2: { fontWeight: 700, fontSize: '2.25rem' },
          h3: { fontWeight: 700, fontSize: '1.75rem' },
          h4: { fontWeight: 700, fontSize: '1.25rem' },
          body1: { fontSize: '1.1rem' },
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 8,
                boxShadow: 'none',
                backgroundColor: '#111',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#222',
                  boxShadow: 'none',
                },
              },
              outlined: {
                backgroundColor: '#fff',
                color: '#111',
                border: '1px solid #111',
                '&:hover': {
                  backgroundColor: '#fafafa',
                  color: '#111',
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
} 