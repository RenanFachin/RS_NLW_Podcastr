import Image from "next/image"

import Playing from '../../public/playing.svg'
import Shuffle from '../../public/shuffle.svg'
import PlayPrevious from '../../public/play-previous.svg'
import Play from '../../public/play.svg'
import Pause from '../../public/pause.svg'
import PlayNext from '../../public/play-next.svg'
import Repeat from '../../public/repeat.svg'
import { useEffect, useRef } from "react"

import 'rc-slider/assets/index.css';
import Slider from "rc-slider"
import { usePlayer } from "@/hooks/usePlayer"

export function Player() {
    const audioRef = useRef<HTMLAudioElement>(null)


    const { episodeList, currentEpisodeIndex, isPlaying, togglePlay, setPlayingState, playNext, playPrevious, hasNext, hasPrevious } = usePlayer()

    useEffect(() => {
        if (!audioRef.current) {
            return
        }

        if (isPlaying) {
            audioRef.current.play()
        } else {
            audioRef.current.pause()
        }

    }, [isPlaying])


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

            <footer className={`self-stretch ${!episode ? 'opacity-40' : ''}`}>
                <div className="flex items-center gap-4 text-sm">
                    <span className="inline-block w-16 text-center">00:00</span>
                    <div className="flex-1">
                        {episode ? (
                            <Slider
                                trackStyle={{ backgroundColor: '#04d361' }}
                                railStyle={{ backgroundColor: '#9f75ff' }}
                                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                            />
                        ) : (
                            <div className="w-full h-1 bg-purple-300 border-2" />
                        )}
                    </div>
                    <span className="inline-block w-16 text-center">00:00</span>
                </div>


                {/* Utilizando aúdios */}
                {episode && (
                    <audio
                        src={episode.url}
                        ref={audioRef}
                        autoPlay
                        onPlay={() => setPlayingState(true)} // play com teclado
                        onPause={() => setPlayingState(false)} // pausando
                    />
                )}

                <div className="flex items-center justify-center mt-10 gap-6">
                    <button
                        type="button"
                        disabled={!episode}
                        className={`bg-transparent disabled:cursor-default enabled:hover:brightness-90 transition-all`}
                    >
                        <Image
                            src={Shuffle}
                            alt="Embaralhar"
                        />
                    </button>

                    <button
                        disabled={!episode || !hasPrevious}
                        className={`disabled:cursor-default enabled:hover:brightness-90 transition-all disabled:opacity-50`}
                        onClick={playPrevious}
                    >
                        <Image
                            src={PlayPrevious}
                            alt="Tocar anterior"
                        />
                    </button>

                    <button
                        disabled={!episode}
                        className={`w-16 h-16 rounded-2xl bg-purple-400 flex items-center justify-center disabled:cursor-default hover:brightness-95 transition-all enabled:hover:brightness-90`}
                        onClick={togglePlay}
                    >
                        {isPlaying ?
                            <Image
                                src={Pause}
                                alt="Pausar"
                            />
                            :
                            <Image
                                src={Play}
                                alt="Tocar"
                            />
                        }
                    </button>

                    <button
                        className={`disabled:cursor-default enabled:hover:brightness-90 transition-all disabled:opacity-50`}
                        disabled={!episode || !hasNext}
                        onClick={playNext}
                    >
                        <Image
                            src={PlayNext}
                            alt="Tocar próxima"
                        />
                    </button>

                    <button
                        className={`disabled:cursor-default enabled:hover:brightness-90 transition-all`}
                        disabled={!episode}
                    >
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