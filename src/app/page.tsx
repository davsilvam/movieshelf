import { ArrowUpRight } from 'lucide-react'

import { BannerSlider, Header, LinkButton, MovieCatalog } from 'components'

export default function Home() {
  return (
    <main className="bg-woodsmoke">
      <Header />
      <BannerSlider />
      <MovieCatalog />

      <div className="flex h-screen w-full flex-col items-center justify-center gap-5 md:gap-10">
        <p className="font-alt text-3xl font-semibold text-white md:text-5xl">
          Não achou o que queria?
        </p>

        <LinkButton href="/discover" icon={ArrowUpRight}>
          Descubra outros títulos
        </LinkButton>
      </div>
    </main>
  )
}
