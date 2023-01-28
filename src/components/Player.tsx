import Image from "next/image"

import Playing from '../../public/playing.svg'
import Shuffle from '../../public/shuffle.svg'
import PlayPrevious from '../../public/play-previous.svg'
import Play from '../../public/play.svg'
import PlayNext from '../../public/play-next.svg'
import Repeat from '../../public/repeat.svg'
import { useContext } from "react"
import { PlayerContext } from "@/contexts/PlayerContexts"

export function Player() {
    const { episodeList, currentEpisodeIndex } = useContext(PlayerContext)

    // determinando o episódio que está tocando
    const episode = episodeList[currentEpisodeIndex]


    return (
        <div className="w-104 h-screen py-12 px-16 bg-purple-500 text-white flex flex-col items-center justify-between">
            <header className="flex items-center gap-4">
                <Image
                    src={Playing}
                    alt="Tocando agora"
                />

                <strong className="font-Lexend font-semibold">
                    Tocando agora
                </strong>
            </header>


            {episode
                ?
                <div className="text-center">
                    <Image
                        className="object-cover rounded-3xl"
                        width={592}
                        height={592}
                        src={episode.thumbnail}
                        alt={'Imagem de capa do epísodio'}
                    />

                    <strong className="block mt-8 font-Lexend font-semibold text-xl leading-7">
                        {episode.title}
                    </strong>

                    <span className="block mt-4 opacity-60 leading-6">
                        {episode.members}
                    </span>
                </div>
                :
                (
                    <div className="w-full h-80 border-[1.5px] border-dashed border-purple-300 rounded-3xl bg-player-gradient p-16 text-center flex items-center justify-center">
                        <strong className="font-Lexend font-semibold">
                            Selecione um podcast para ouvir
                        </strong>
                    </div >
                )
            }

            <footer className="self-stretch opacity-40">
                <div className="flex items-center gap-4 text-sm">
                    <span className="inline-block w-16 text-center">00:00</span>
                    <div className="flex-1">
                        <div className="w-full h-1 bg-purple-300 border-2" />
                    </div>
                    <span className="inline-block w-16 text-center">00:00</span>
                </div>

                <div className="flex items-center justify-center mt-10 gap-6">
                    <button type="button" className="bg-transparent">
                        <Image
                            src={Shuffle}
                            alt="Embaralhar"
                        />
                    </button>

                    <button>
                        <Image
                            src={PlayPrevious}
                            alt="Tocar anterior"
                        />
                    </button>

                    <button className="w-16 h-16 rounded-2xl bg-purple-400 flex items-center justify-center">
                        <Image
                            src={Play}
                            alt="Tocar"
                        />
                    </button>

                    <button>
                        <Image
                            src={PlayNext}
                            alt="Tocar próxima"
                        />
                    </button>

                    <button>
                        <Image
                            src={Repeat}
                            alt="Repetir"
                        />
                    </button>
                </div>
            </footer>
        </div >
    )
}