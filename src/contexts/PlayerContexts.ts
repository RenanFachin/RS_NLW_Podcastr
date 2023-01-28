import { createContext } from "react";

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
    play: (episode: Episode) => void;
}

// {} as PlayerContextData é para mostrar a estrutura de dados a serem recebidos pelo contexto
export const PlayerContext = createContext({} as PlayerContextData)