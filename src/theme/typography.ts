/**
 * Tipografia – tamanhos e pesos.
 * Fonte do sistema por padrão; pode ser trocada por fonte customizada depois.
 */
import {Platform} from 'react-native';

const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

export const typography = {
  fontFamily,
  sizes: {
    xs: 12,
    sm: 14,
    body: 16,
    lg: 18,
    title: 20,
    headline: 24,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
} as const;

export type Typography = typeof typography;
