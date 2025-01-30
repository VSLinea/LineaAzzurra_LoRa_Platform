"use client"

import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()

  const handleToggleTheme = () => {
    console.log('Toggling theme from:', theme)
    toggleTheme()
  }

  return (
    <button
      onClick={handleToggleTheme}
      className="p-2 rounded-lg text-gray-400 hover:text-gray-200"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
} 