import React from 'react'

// Components
import {
  Header,
  HottestMovieBanner,
  MovieSection,
  Sidebar
} from '../../components'

// Utils
import { GoToTop } from '../../utils/GoToTop'

export const Home: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full bg-darkest text-lightest">
      <Sidebar />
      <div className="flex w-full flex-col lg:max-w-[80%] xl:max-w-[84%]">
        <Header />
        <main className="flex w-full flex-col px-8 max-lg:gap-8 lg:gap-4">
          <HottestMovieBanner />
          <MovieSection
            title="Populares"
            movieURL={`/movie/popular?api_key=${
              import.meta.env.VITE_API_KEY
            }&language=pt-BR`}
          />
          
          <MovieSection
            title="Melhor avaliados"
            movieURL={`/movie/top_rated?api_key=${
              import.meta.env.VITE_API_KEY
            }&language=pt-BR&page=1`}
          />
        </main>
      </div>
      <GoToTop />
    </div>
  )
}
