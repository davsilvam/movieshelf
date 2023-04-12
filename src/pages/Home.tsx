import { FC } from 'react'

// components
import { Header, HottestMovieBanner, MovieSection } from '../components'

// layout
import { PageLayout } from './'

// utils
import { POPULAR_MOVIES_URL, TOP_RATED_MOVIES } from '../utils'

export const Home: FC = () => (
  <PageLayout>
    <Header />

    <main className="flex w-full flex-col gap-8 lg:gap-12">
      <HottestMovieBanner />
      <div className="flex flex-col gap-6 px-8 pb-10 max-lg:gap-8">
        <MovieSection title="Populares" url={POPULAR_MOVIES_URL} />

        <MovieSection title="Melhor avaliados" url={TOP_RATED_MOVIES} />
      </div>
    </main>
  </PageLayout>
)
