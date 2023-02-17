import { FC } from 'react'

// Components
import {
  Header,
  HottestMovieBanner,
  MobileNavbar,
  MovieSection,
  Sidebar
} from '../components/exports'

// Utils
import { GoToTop } from '../utils/GoToTop'

export const Home: FC = () => {
  return (
    <div className="flex min-h-screen w-full bg-secondary-900 text-secondary-50 max-md:pb-20">
      <Sidebar />
      <MobileNavbar />
      <div className="relative flex w-full flex-col lg:max-w-[80%] xl:max-w-[84%]">
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
      </div>
      <GoToTop />
    </div>
  )
}
