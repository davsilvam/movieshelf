import { Banner, CategoryCards, MovieCatalog } from 'components'

export default function Home() {
  return (
    <main className="bg-bunker-950">
      <Banner />
      <CategoryCards />
      <MovieCatalog />
    </main>
  )
}
