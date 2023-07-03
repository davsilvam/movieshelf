import { Header } from 'components'
import { Roboto_Flex as RobotoFlex, Teko } from 'next/font/google'
import { ReactNode } from 'react'
import 'styles/globals.css'

const teko = Teko({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-teko',
})
const roboto = RobotoFlex({ subsets: ['latin'], variable: '--font-roboto' })

export const metadata = {
  title: 'Movieshelf',
  description:
    'Movieshelf é um site que consome a api do TMDB e apresenta os filmes para o usuário.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${teko.variable} ${roboto.variable} font-sans`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
