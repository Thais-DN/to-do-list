"use client";

import { Moon, Sun } from "lucide-react";
import React, { useState, useEffect } from "react";

const ThemeToggle: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const isDarkMode = localStorage.getItem("darkMode") === "true";
        setDarkMode(isDarkMode);
        document.documentElement.classList.toggle("dark", isDarkMode);
    }, []);

    useEffect(() => {
        localStorage.setItem("darkMode", darkMode.toString());
        document.documentElement.classList.toggle("dark", darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-md text-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 dark:text-violet-300 ${
                darkMode ? "dark:bg-slate-700" : "bg-slate-200"
            }`}
        >
            {darkMode ? <Moon /> : <Sun />}
        </button>
    );
};

export default ThemeToggle;
