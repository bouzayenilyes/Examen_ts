import React, { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTodoStore } from '../store/todoStore';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTodoStore();

  useEffect(() => {
    // Check for system preference
    if (!localStorage.getItem('theme')) {
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(systemPreference);
      document.documentElement.classList.toggle('dark', systemPreference === 'dark');
    } else {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-3 rounded-xl bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:scale-105"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
};