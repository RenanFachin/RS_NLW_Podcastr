import { createContext, ReactNode, useState } from "react";

// Tipando o array
type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

// Tipando as informações que queremos salvar dentro do contexto
type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    play: (episode: Episode) => void;
    togglePlay: () => void
    setPlayingState: (setPlayingState: boolean) => void
}

// {} as PlayerContextData é para mostrar a estrutura de dados a serem recebidos pelo contexto
export const PlayerContext = createContext({} as PlayerContextData)


type PlayerContextProviderProps = {
    children: ReactNode;
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
    // Criando estados para poder manipular os valores de variáveis
    const [episodeList, setEpisodeList] = useState<Episode[]>([])
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)

    function play(episode: Episode) {
        setEpisodeList([episode])
        setCurrentEpisodeIndex(0)
        setIsPlaying(true)
    }

    function togglePlay() {
        setIsPlaying(!isPlaying)
    }

    function setPlayingState(isPlayingState: boolean) {
        setIsPlaying(isPlayingState)
    }

    return (
        <PlayerContext.Provider
            value={{
                episodeList: episodeList,
                currentEpisodeIndex: currentEpisodeIndex,
                // Passando a função play
                play,
                isPlaying,
                togglePlay,
                setPlayingState
            }}
        >
            {children}
        </PlayerContext.Provider>
    )
}