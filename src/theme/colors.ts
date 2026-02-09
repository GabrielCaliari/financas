/**
 * Paleta do app – identidade da logo (preto, verde, vermelho, amarelo).
 * Cores semânticas mudam entre modo claro e escuro.
 */

// Cores de marca (fixas) – usadas em ambos os modos onde fizer sentido
export const brand = {
  black: '#121212',
  white: '#FFFFFF',
  green: '#04c200',
  greenDark: '#039301', // verde mais escuro (botões no modo claro)
  red: '#E53935', // despesas, cancelar, alertas
  yellow: '#F9A825', // acentos (não o FAB)
} as const;

export type BrandColors = typeof brand;

// Modo escuro: preto como fundo, verde como destaque
export const darkColors = {
  background: '#121212',
  surface: '#1e1e1e',
  surfaceElevated: '#2a2a2a',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  border: 'rgba(255, 255, 255, 0.12)',
  borderLight: 'rgba(255, 255, 255, 0.08)',
  primary: brand.green,
  primaryContrast: brand.white,
  error: brand.red,
  success: brand.green,
  tabBar: '#121212',
  tabActive: brand.green,
  tabInactive: '#808080',
  overlay: 'rgba(0, 0, 0, 0.5)',
  // Receita vs despesa (badges/listas)
  income: '#049301',
  expense: '#C62828',
} as const;

// Modo claro: branco como fundo, preto como texto, verde escuro como primária
export const lightColors = {
  background: '#F5F5F5',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  text: '#121212',
  textSecondary: '#616161',
  border: 'rgba(0, 0, 0, 0.12)',
  borderLight: 'rgba(0, 0, 0, 0.06)',
  primary: brand.greenDark,
  primaryContrast: brand.white,
  error: brand.red,
  success: brand.greenDark,
  tabBar: '#FFFFFF',
  tabActive: brand.greenDark,
  tabInactive: '#9E9E9E',
  overlay: 'rgba(0, 0, 0, 0.4)',
  income: '#2E7D32',
  expense: '#C62828',
} as const;

export type ThemeColors = typeof darkColors;

export type ColorScheme = 'light' | 'dark';

export function getColors(scheme: ColorScheme): ThemeColors {
  return scheme === 'dark' ? darkColors : lightColors;
}
