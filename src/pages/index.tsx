import { GetStaticProps } from "next"
import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import { api } from "@/services/api";
import ptBR from "date-fns/locale/pt-BR";
import { convertDurationToTimeString } from "@/utils/convertDurationToTimeString";

import PlayGreen from '../../public/play-green.svg'

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

type HomeProps = {
  latestEpisodes: Episode[]
  allEpisodes: Episode[]
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  console.log(latestEpisodes)

  return (
    <div className="px-16 h-[calc(100vh_-_7rem)] overflow-y-scroll">
      <section className="">
        <h2 className="mt-12 mb-6">
          Ultimos lançamentos
        </h2>

        {/* Pegando apenas os 2 últimos episódios - DICA: fazer dois returns diferentes da API*/}
        <ul className="list-none grid grid-cols-2 gap-6">
          {
            latestEpisodes.map(episode => {
              return (
                <li key={episode.id} className="bg-white border border-gray-100 p-5 rounded-3xl relative flex items-center">
                  <Image
                    className="w-24 h-24 object-cover rounded-2xl"
                    src={episode.thumbnail}
                    alt={episode.title}
                    // Esta width e height não são a altura que será mostrado em tela
                    width={192}
                    height={192}
                  />

                  <div className="flex-1 ml-4">
                    <a href="" className="block text-gray-800 font-Lexend font-semibold leading-6 hover:underline">
                      {episode.title}
                    </a>

                    <p className="text-xs mt-2 max-w-7/10 whitespace-nowrap overflow-hidden text-ellipsis">
                      {episode.members}
                    </p>

                    <span className="inline-block mt-2 text-xs">
                      {episode.publishedAt}
                    </span>

                    <span className="inline-block mt-2 text-xs ml-2 pl-2 relative">
                      {episode.durationAsString}
                    </span>
                  </div>

                  <button className="absolute right-8 bottom-8 w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center hover:brightness-90 transition-all">
                    <Image
                      className="w-6 h-6"
                      src={PlayGreen}
                      alt={'Botão de play para tocar o episódio'}
                    />
                  </button>

                </li>
              )
            })
          }
        </ul>
      </section>



      <section className="pb-8">
        <h2 className="my-8">
          Todos os episódios
        </h2>

        <table cellSpacing={0} className="w-full">
          <thead>
            <th
              className="text-gray-200 uppercase font-medium text-xs font-Lexend text-left">

            </th>

            <th
              className="text-gray-200 uppercase font-medium text-xs font-Lexend text-left">
              Podcast
            </th>

            <th
              className="text-gray-200 uppercase font-medium text-xs font-Lexend text-left">
              Integrantes
            </th>

            <th
              className="text-gray-200 uppercase font-medium text-xs font-Lexend text-left">
              Data
            </th>

            <th
              className="text-gray-200 uppercase font-medium text-xs font-Lexend text-left">
              Duração
            </th>

            <th
              className="text-gray-200 uppercase font-medium text-xs font-Lexend text-left"></th>
          </thead>

          <tbody>
            {allEpisodes.map(episode => {
              return (
                <tr key={episode.id}>
                  <td>

                    <Image
                      className="w-10 h-10 rounded-lg object-cover"
                      src={episode.thumbnail}
                      alt={episode.title}
                      width={120}
                      height={120}
                    />
                  </td>

                  <td>
                    <a
                      href=""
                      className="text-gray-800 font-Lexend font-semibold leading-6 text-base hover:underline"
                    >
                      {episode.title}
                    </a>
                  </td>

                  <td>
                    {episode.members}
                  </td>

                  <td>
                    {episode.publishedAt}
                  </td>

                  <td>
                    {episode.durationAsString}
                  </td>

                  <td>
                    <button className="w-8 h-8 bg-white border border-gray-100 rounded-xl flex items-center justify-center hover:brightness-90 transition-all">
                      <Image
                        className="w-4 h-4"
                        src={PlayGreen}
                        alt={'Botão de play para tocar o episódio'}
                      />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </div>
  )
}





export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  // tipando o que vem da API
  interface episodeProps {
    id: string;
    title: string;
    thumbnail: string;
    members: string;
    published_at: string;
    description: string;
    file: {
      duration: number;
      durationAsString: number;
      url: string;
    }
  }

  // Formatando o que vem da API antes de chamar dentro do return da página
  const episodes = data.map((episode: episodeProps) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url
    }
  })


  // Criando uma variável para receber apenas os 2 últimos episódios e retornando como props
  const latestEpisodes = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.length)

  return {
    props: {
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8
  }
}