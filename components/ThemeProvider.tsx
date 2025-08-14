'use client'

import { ReactNode, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'auto'

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark'
    return (localStorage.getItem('theme') as Theme) || 'dark'
  })

  useEffect(() => {
    if (theme === 'auto') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      const apply = () => document.documentElement.classList.toggle('dark', mq.matches)
      apply()
      mq.addEventListener('change', apply)
      return () => mq.removeEventListener('change', apply)
    }
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
    }
  }, [])

  return (
    <div>
      <div className="fixed top-2 right-2 flex gap-1">
        <button onClick={() => setTheme('dark')} className="px-2 py-1 rounded bg-gray-700 text-white" aria-label="Thème sombre">🌙</button>
        <button onClick={() => setTheme('light')} className="px-2 py-1 rounded bg-gray-200 text-black" aria-label="Thème clair">☀️</button>
        <button onClick={() => setTheme('auto')} className="px-2 py-1 rounded bg-gray-500 text-white" aria-label="Thème auto">A</button>
      </div>
      {children}
    </div>
  )
}
