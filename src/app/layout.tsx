import { Metadata } from 'next'
import {
  Fjalla_One as FjallaOne,
  Roboto_Flex as RobotoFlex,
} from 'next/font/google'
import { ReactNode } from 'react'

import { MovieProvider } from 'contexts'

import { QueryProvider } from 'services'
import 'styles/globals.css'

const fjallaOne = FjallaOne({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-fjalla',
})

const roboto = RobotoFlex({ subsets: ['latin'], variable: '--font-roboto' })

export const metadata: Metadata = {
  title: 'Movieshelf',
  description:
    'Movieshelf é um site que consome a api do TMDB e apresenta os filmes para o usuário.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${fjallaOne.variable} ${roboto.variable} font-sans`}>
        <QueryProvider>
          <MovieProvider>{children}</MovieProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
