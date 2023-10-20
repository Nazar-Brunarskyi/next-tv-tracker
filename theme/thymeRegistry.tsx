'use client'
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ReactNode } from 'react';
import { NextAppDirEmotionCacheProvider } from './EmotionCache';


const themeOptions: ThemeOptions = {
  // palette: {
  //   background: {
  //     default: 'red',
  //     paper: '#000',
  //   },
  // },
};

const theme = createTheme(themeOptions);

export default function ThymeRegistry({ children }: { children: ReactNode }) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );

}