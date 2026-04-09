import { useCSSVariable } from 'uniwind';

const VAR_KEYS = {
  // Brand & Layout
  background: '--color-background',
  foreground: '--color-foreground',
  card: '--color-card',

  // States & Actions
  muted: '--color-muted',
  mutedForeground: '--color-muted-foreground',
  primary: '--color-primary',
  accent: '--color-accent',
  border: '--color-border',
  success: '--color-success',
  destructive: '--color-destructive',

  // Typography
  fontSans: '--font-sans',
  fontSansLight: '--font-sans-light',
  fontSansMedium: '--font-sans-medium',
  fontSansSemibold: '--font-sans-semibold',
  fontSansBold: '--font-sans-bold',
  fontSansExtrabold: '--font-sans-extrabold',
} as const;

export function useTheme() {
  return Object.entries(VAR_KEYS).reduce(
    (acc, [key, value]) => {
      acc[key as keyof typeof VAR_KEYS] = useCSSVariable(value) as string;
      return acc;
    },
    {} as Record<keyof typeof VAR_KEYS, string>,
  );
}
