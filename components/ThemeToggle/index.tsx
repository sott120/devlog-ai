"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";

const DARK_MODE_STORAGE_KEY = "devlog-ai-theme";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleDarkMode = (): void => {
    const nextIsDarkMode = !isDarkMode;

    setIsDarkMode(nextIsDarkMode);
    document.documentElement.classList.toggle("dark", nextIsDarkMode);
    window.localStorage.setItem(DARK_MODE_STORAGE_KEY, nextIsDarkMode ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={handleToggleDarkMode}
      className="relative h-8 w-16 cursor-pointer rounded-full border bg-white/60 p-1 transition-colors dark:bg-black/40"
      aria-label="다크모드 토글"
    >
      <span
        className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-transform dark:bg-zinc-900 ${
          isDarkMode ? "translate-x-8" : "translate-x-0"
        }`}
      />
      <span className="relative z-10 flex h-full items-center justify-between px-1">
        <Sun className="size-3 text-amber-500" />
        <Moon className="size-3 text-indigo-500" />
      </span>
    </button>
  );
};

export default ThemeToggle;
