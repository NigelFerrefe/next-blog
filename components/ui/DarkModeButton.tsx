'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function DarkModeButton() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <button type="button" onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}>
      {currentTheme === 'dark' ? (
        <Sun className="h-6 w-6 text-yellow-600 hover:text-yellow-700" aria-hidden="true" />
      ) : (
        <Moon className="h-6 w-6 text-blue-800 hover:text-blue-900" aria-hidden="true" />
      )}
    </button>
  );
}
