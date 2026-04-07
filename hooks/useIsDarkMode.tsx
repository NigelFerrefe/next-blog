'use client';

import { useTheme } from 'next-themes';

export default function useIsDarkMode() {
  const { resolvedTheme } = useTheme();

  if (!resolvedTheme) return false;

  return resolvedTheme === 'dark';
}