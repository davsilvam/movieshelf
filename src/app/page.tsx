import { Banner, CategoryCards, MovieCatalog } from 'components'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="bg-bunker-950">
      <Banner />
      <CategoryCards />
      <MovieCatalog />

      <div className="flex h-screen w-full flex-col items-center justify-center gap-10">
        <p className="font-alt text-5xl font-semibold text-bunker-50">
          Não achou o que queria?
        </p>

        <Link
          className="flex items-center gap-2 rounded-lg bg-bunker-50 px-8 py-3 font-semibold text-bunker-950"
          href="/genres"
        >
          Confira outros gêneros <ArrowUpRight className="h-5 w-5" />
        </Link>
      </div>
    </main>
  )
}
