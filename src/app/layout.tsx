import {
  Fjalla_One as fjallaOne,
  Roboto_Flex as robotoFlex,
} from 'next/font/google'
import { ReactNode } from 'react'
import 'styles/globals.css'

const fjalla = fjallaOne({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-fjalla-one',
})
const roboto = robotoFlex({ subsets: ['latin'], variable: '--font-roboto' })

export const metadata = {
  title: 'Movieshelf',
  description:
    'Movieshelf é um site que consome a api do TMDB e apresenta os filmes para o usuário.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${fjalla.variable} ${roboto.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}
