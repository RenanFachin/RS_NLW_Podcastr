import type { AppProps } from 'next/app'
import '../styles/globals.css'

import { Header } from "@/components/Header"
import { Player } from "@/components/Player"

import { Inter, Lexend } from '@next/font/google'
import { PlayerContext } from '@/contexts/PlayerContexts'
import { useState } from 'react'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend'
})

export default function App({ Component, pageProps }: AppProps) {
  // Criando estados para poder manipular os valores de variáveis
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)

  function play(episode) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList: episodeList,
        currentEpisodeIndex: currentEpisodeIndex,
        // Passando a função play
        play
      }}
    >
      <div className={`${inter.variable} ${lexend.variable} font-sans flex`}>

        <main className='flex-1'>
          <Header />
          <Component {...pageProps} />
        </main>

        <Player />
      </div>
    </PlayerContext.Provider>
  )
}
