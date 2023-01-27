import { api } from "@/services/api";
import { convertDurationToTimeString } from "@/utils/convertDurationToTimeString";

// Libs
import { format, parseISO } from 'date-fns'
import ptBR from "date-fns/locale/pt-BR";

import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";

type Episode = {
    id: string;
    title: string;
    thumbnail: string;
    members: string;
    publishedAt: string;
    description: string;
    duration: number;
    durationAsString: number;
    url: string;
}

type EpisodeProps = {
    episode: Episode;
}

export default function Episode({ episode }: EpisodeProps) {
    return (
        <div className="max-w-3xl py-12 px-8 mx-auto">
            <div className="relative">
                <Link href={'/'}>
                    <button
                        type="button"
                        className="w-12 h-12 rounded-xl absolute z-10 hover:brightness-90 transition-all left-0 top-1/2 bg-purple-500 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
                    >

                        <img
                            src="/arrow-left.svg"
                            alt="voltar"
                        />
                    </button>
                </Link>

                <Image
                    className="object-cover rounded-2xl"
                    width={700}
                    height={160}
                    src={episode.thumbnail}
                    alt={'imagem de thumbnail'}
                />

                <button
                    type="button"
                    className="w-12 h-12 rounded-xl absolute z-10 hover:brightness-90 transition-all right-0 top-1/2 bg-green-500 flex items-center justify-center translate-x-1/2 -translate-y-1/2"
                >
                    <img
                        src="/play.svg"
                        alt="Tocar episódio"
                    />
                </button>
            </div>

            <header className="pb-4 border-b border-b-gray-100">
                <h1 className="my-7">
                    {episode.title}
                </h1>


                <span className="inline-block text-sm">
                    {episode.members}
                </span>

                <span className="inline-block text-sm ml-4 pl-1 relative">
                    - {episode.publishedAt}
                </span>

                <span className="inline-block text-sm ml-4 pl-1 relative">
                    - {episode.durationAsString}
                </span>
            </header>

            <div
                className="mt-6 leading-6 text-gray-800"
                dangerouslySetInnerHTML={{ __html: episode.description }}
            />

        </div>
    )
}


export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const slug = context.params?.slug as string

    const { data } = await api.get(`episodes/${slug}`);

    const episode = {
        id: data.id,
        title: data.title,
        members: data.members,
        publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
        thumbnail: data.thumbnail,
        description: data.description,
        url: data.file.url,
        duration: Number(data.file.duration),
        durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    };

    return {
        props: { episode },
        revalidate: 60 * 60 * 24, // 24 hours
    };
};