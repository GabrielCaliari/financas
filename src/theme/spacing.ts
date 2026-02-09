/**
 * Escala de espaçamentos padrão para manter consistência entre telas e componentes.
 */
export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
} as const;

export type Spacing = typeof spacing;
