"use client"
import { useState, useEffect } from 'react';
import { Sun, Moon } from "lucide-react";



const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-900">
      {theme === 'light' ? <Sun /> : <Moon />}
    </button>
  );
};

export default ThemeToggle;
