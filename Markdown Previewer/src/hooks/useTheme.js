import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

/**
 * useTheme
 * Persists the user's light/dark preference and applies it as a
 * data-theme attribute on <html> so CSS variables can respond to it.
 *
 * @returns {{ theme: 'light'|'dark', toggleTheme: () => void }}
 */
export function useTheme() {
  const prefersDark =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches

  const [theme, setTheme] = useLocalStorage(
    'mp-theme',
    prefersDark ? 'dark' : 'light'
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () =>
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))

  return { theme, toggleTheme }
}
