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
    isLooping: boolean;
    isShuffling: boolean;
    play: (episode: Episode) => void;
    togglePlay: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    setPlayingState: (setPlayingState: boolean) => void;
    playList: (list: Episode[], index: number) => void;
    playNext: () => void;
    playPrevious: () => void;
    hasNext: boolean;
    hasPrevious: Boolean;
    clearPlayerState: () => void;
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

    const [isLooping, setIsLooping] = useState(false)
    const [isShuffling, setIsShuffling] = useState(false)


    function play(episode: Episode) {
        setEpisodeList([episode])
        setCurrentEpisodeIndex(0)
        setIsPlaying(true)
    }


    // 12 episodios
    // ex: play no 6 então, o index é 6 e o list é o 12
    function playList(list: Episode[], index: number) {
        setEpisodeList(list)
        setCurrentEpisodeIndex(index)
        setIsPlaying(true)
    }

    // Constantes para gerenciar os botões de previous e next para qnd não houver previous ou next na episodeList
    const hasPrevious = currentEpisodeIndex > 0
    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length

    function playNext() {

        if (isShuffling) {
            // Caso esteja com o shuffle ativo
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
            setCurrentEpisodeIndex(nextRandomEpisodeIndex)

        } else if (hasNext) {
            // validação para ver se o episódio é o ultimo e não tem outro após
            setCurrentEpisodeIndex(currentEpisodeIndex + 1)
        }

    }

    function playPrevious() {
        if (hasPrevious) {
            setCurrentEpisodeIndex(currentEpisodeIndex - 1)
        }

    }

    function togglePlay() {
        setIsPlaying(!isPlaying)
    }

    function toggleLoop() {
        setIsLooping(!isLooping)
    }

    function toggleShuffle() {
        setIsShuffling(!isShuffling)
    }

    function setPlayingState(isPlayingState: boolean) {
        setIsPlaying(isPlayingState)
    }

    function clearPlayerState(){
        setEpisodeList([])
        setCurrentEpisodeIndex(0)
    }

    return (
        <PlayerContext.Provider
            value={{
                episodeList: episodeList,
                currentEpisodeIndex: currentEpisodeIndex,
                // Passando a função play
                play,
                isPlaying,
                isLooping,
                togglePlay,
                setPlayingState,
                playList,
                playNext,
                playPrevious,
                hasNext,
                hasPrevious,
                toggleLoop,
                isShuffling,
                toggleShuffle,
                clearPlayerState
            }}
        >
            {children}
        </PlayerContext.Provider>
    )
}




