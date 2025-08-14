import './globals.css'
import { ReactNode } from 'react'
import ThemeProvider from '../components/ThemeProvider'

export const metadata = {
  title: 'Attestation',
  description: "Générateur d'attestation d'hébergement"
}

const themeScript = `(() => {
  try {
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else if (theme === 'dark' || !theme) {
      document.documentElement.classList.add('dark');
    } else if (theme === 'auto') {
      const m = window.matchMedia('(prefers-color-scheme: dark)');
      document.documentElement.classList.toggle('dark', m.matches);
      m.addEventListener('change', e => document.documentElement.classList.toggle('dark', e.matches));
    }
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();`

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="dark light" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
