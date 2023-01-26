import type { AppProps } from 'next/app'
import '../styles/globals.css'

import { Inter, Lexend } from '@next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend'
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.variable} ${lexend.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  )
}
