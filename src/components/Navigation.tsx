import Link from 'next/link'

export function Navigation() {
  return (
    <nav className="space-x-8 font-medium text-bunker-50">
      <Link href="movies/popular">Populares</Link>
      <Link href="movies/hottest">Novidades</Link>
      <Link href="genres">Gêneros</Link>
    </nav>
  )
}
