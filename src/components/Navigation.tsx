import Link from 'next/link'

export function Navigation() {
  return (
    <nav className="space-x-8 font-medium text-bunker-50">
      <Link href="popular">Populares</Link>
      <Link href="genres">Gêneros</Link>
    </nav>
  )
}
