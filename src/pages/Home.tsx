import { FC } from 'react'

// Components
import { Header, HottestMovieBanner, MovieSection } from '../components/exports'

// Layout
import { PageLayout } from './PageLayout'

export const Home: FC = () => {
  return (
    <PageLayout>
      <Header />
      <main className="flex w-full flex-col gap-8 lg:gap-12">
        <HottestMovieBanner />
        <div className="flex flex-col gap-6 px-8 pb-10 max-lg:gap-8">
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
        </div>
      </main>
    </PageLayout>
  )
}
