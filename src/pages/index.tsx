// Consumindo API
// Forma 1: SPA (quando a pessoa acessa a rota). Dificuldade nos motores de busca
// Forma 2: SSR é "renderizado" em uma camada anterior no next e é executada toda vez que alguem acessar a página
// Forma 3: SSG só é feita chamada a api novamente de tempos em tempo (+ performático) e só funciona em produção


import { useEffect } from "react"

export default function Home(props:any) {

  // Forma 2
  // console.log(props.episodes)

  // Forma 1:
  // useEffect(() => {
  //   fetch('http://localhost:3333/episodes')
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  // }, [])

  return (
    <div className="">
    </div>
  )
}

// Forma 2:
// export async function getServerSideProps() {
//   const response = await fetch('http://localhost:3333/episodes')
//   const data = await response.json()

//   return {
//     // Precisa sempre retornar PROPS de dentro desta função e dizer quais dados estamos buscando
//     props: {
//       // TUDO que está dentro deste PROPS pode ser repassado para o componente
//       episodes: data,
//     }
//   }
// }

// Forma 3:
export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    // Precisa sempre retornar PROPS de dentro desta função e dizer quais dados estamos buscando
    props: {
      // TUDO que está dentro deste PROPS pode ser repassado para o componente
      episodes: data,
    },
    // revalidate é o tempo necessário para a próxima rerendização da página
    revalidate: 60 * 60 * 8 // a cada 8 horas a página é refeita com chamada na api
  }
}