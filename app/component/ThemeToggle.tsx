"use client";
import { useState, useEffect } from 'react';
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setIsRotating(true);
    setTimeout(() => {
      setTheme(theme === 'light' ? 'dark' : 'light');
      setIsRotating(false);
    }, 300); // Duración de la animación en milisegundos
  };

  return (
    <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-900">
      <div className={isRotating ? 'rotate' : ''}>
        {theme === 'light' ? <Sun /> : <Moon />}
      </div>
    </button>
  );
};

export default ThemeToggle;
