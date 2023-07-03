import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import 'styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Movieshelf',
  description:
    'Movieshelf é um site que consome a api do TMDB e apresenta os filmes para o usuário.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
