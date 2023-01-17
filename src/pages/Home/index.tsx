import React from 'react'

import { Header } from '../../components/Header'
import { MovieSection } from '../../components/MovieSection'
import { Sidebar } from '../../components/Sidebar'

export const Home: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full bg-darkest text-lightest">
      <Sidebar />
      <div className="flex w-full flex-col lg:max-w-[84%]">
        <Header />
        <main className="flex w-full flex-col px-8 py-4 max-lg:gap-8 lg:gap-4">
          <MovieSection
            title="Populares"
            movieURL={`https://api.themoviedb.org/3/movie/popular?api_key=${
              import.meta.env.VITE_API_KEY
            }&language=pt-BR`}
          />
          <MovieSection
            title="Melhor avaliados"
            movieURL={`https://api.themoviedb.org/3/movie/top_rated?api_key=${
              import.meta.env.VITE_API_KEY
            }&language=pt-BR&page=1`}
          />
        </main>
      </div>
    </div>
  )
}
