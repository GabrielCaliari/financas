import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import {getColors, type ColorScheme, type ThemeColors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {typography} from '../theme/typography';

const THEME_STORAGE_KEY = '@financas:theme';

let AsyncStorage: typeof import('@react-native-async-storage/async-storage').default | null = null;
try {
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
} catch {
  // Módulo nativo pode não estar linkado ainda; tema funciona sem persistência
}

export type ThemeContextData = {
  colorScheme: ColorScheme;
  colors: ThemeColors;
  spacing: typeof spacing;
  typography: typeof typography;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (scheme: ColorScheme) => void;
};

export const ThemeContext = createContext<ThemeContextData>(
  {} as ThemeContextData,
);

export function ThemeProvider({children}: {children: React.ReactNode}) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');

  const colors = getColors(colorScheme);

  useEffect(() => {
    if (!AsyncStorage) return;
    AsyncStorage.getItem(THEME_STORAGE_KEY)
      .then((stored) => {
        if (stored === 'light' || stored === 'dark') {
          setColorScheme(stored);
        }
      })
      .catch(() => {});
  }, []);

  const setTheme = useCallback((scheme: ColorScheme) => {
    setColorScheme(scheme);
    AsyncStorage?.setItem(THEME_STORAGE_KEY, scheme).catch(() => {});
  }, []);

  const toggleTheme = useCallback(() => {
    setColorScheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      AsyncStorage?.setItem(THEME_STORAGE_KEY, next).catch(() => {});
      return next;
    });
  }, []);

  const value: ThemeContextData = {
    colorScheme,
    colors,
    spacing,
    typography,
    isDark: colorScheme === 'dark',
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  }
  return context;
}
