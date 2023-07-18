import Link from 'next/link'

export function CategoryCards() {
  return (
    <section className="flex w-full items-center justify-between gap-20 font-alt text-4xl text-white">
      <Link
        className="flex h-52 w-full items-center justify-center rounded-md bg-[url(/popular_backdrop.png)] bg-cover bg-center"
        href="movies/popular"
      >
        Popular
      </Link>

      <Link
        className="flex h-52 w-full items-center justify-center rounded-md bg-[url(/hottest_backdrop.png)] bg-cover bg-center"
        href="movies/hottest"
      >
        Novidades
      </Link>
      <Link
        className="flex h-52 w-full items-center justify-center rounded-md bg-[url(/loved_backdrop.png)] bg-cover bg-center"
        href="movies/loved"
      >
        Melhor Avaliados
      </Link>
    </section>
  )
}
