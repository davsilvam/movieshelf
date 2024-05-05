import Link from 'next/link'

import { ArrowUpRight } from 'lucide-react'

import {
  Button,
  Header,
  MenuBar,
  MovieBannerCarousel,
  MovieCatalog,
} from 'components'

export default function Home() {
  return (
    <main className="bg-woodsmoke">
      <Header />

      <MovieBannerCarousel />

      <MovieCatalog />

      <div className="flex h-screen w-full flex-col items-center justify-center gap-5 md:gap-10">
        <p className="font-alt text-3xl font-semibold text-white md:text-5xl">
          Não achou o que queria?
        </p>

        <Button asChild size={'lg'} className="z-10 w-fit">
          <Link href="/discover">
            Descubra outros títulos
            <ArrowUpRight className="w-5" />
          </Link>
        </Button>
      </div>

      <MenuBar />
    </main>
  )
}
