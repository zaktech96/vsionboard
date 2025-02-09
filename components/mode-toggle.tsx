'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#FFE7F1] to-[#FFE7F1]/50 dark:from-gray-800 dark:to-gray-900 transition-all duration-300 hover:scale-110"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4 text-[#FF1B7C] transition-all" />
      ) : (
        <Moon className="h-4 w-4 text-[#FF1B7C] transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
