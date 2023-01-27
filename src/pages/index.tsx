import { GetStaticProps } from "next"
import { format, parseISO } from 'date-fns'
import { api } from "@/services/api";
import ptBR from "date-fns/locale/pt-BR";
import { convertDurationToTimeString } from "@/utils/convertDurationToTimeString";

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  published_at: string;
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
    <div className="">
      <section className="">
        <h2>
          Ultimos lançamentos
        </h2>

        {/* Pegando apenas os 2 últimos episódios - DICA: fazer dois returns diferentes da API*/}
        <ul>
          {
            latestEpisodes.map(episode => {
              return (
                <li key={episode.id}>
                  <a href="">
                    {episode.title}
                  </a>
                </li>
              )
            })
          }
        </ul>
      </section>



      <section className=""></section>
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