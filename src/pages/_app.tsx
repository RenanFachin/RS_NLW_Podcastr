import type { AppProps } from 'next/app'
import '../styles/globals.css'

import { Header } from "@/components/Header"
import { Player } from "@/components/Player"

import { Inter, Lexend } from '@next/font/google'
import { PlayerContextProvider } from '@/contexts/PlayerContexts'

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
    <PlayerContextProvider>
      <div className={`${inter.variable} ${lexend.variable} font-sans flex`}>

        <main className='flex-1'>
          <Header />
          <Component {...pageProps} />
        </main>

        <Player />
      </div>
    </PlayerContextProvider>
  )
}
