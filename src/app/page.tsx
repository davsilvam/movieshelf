import { Banner, Header, LinkButton, MovieCatalog } from 'components'
import { ArrowUpRight } from 'lucide-react'

export default function Home() {
  return (
    <main className="bg-woodsmoke">
      <Header />
      <Banner />
      <MovieCatalog />

      <div className="flex h-screen w-full flex-col items-center justify-center gap-10">
        <p className="font-alt text-5xl font-semibold text-white">
          Não achou o que queria?
        </p>

        <LinkButton href="/genres" icon={ArrowUpRight}>
          Confira outros gêneros
        </LinkButton>
      </div>
    </main>
  )
}
