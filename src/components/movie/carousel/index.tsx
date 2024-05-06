'use client'

import { BannerCard, BannerCarousel, BannerSkeleton } from 'components/banner'

import { useMoviesDependencies } from 'contexts/hooks/use-movies-dependencies'
import { useNowPlayingMovies } from 'hooks'

export function MovieBannerCarousel() {
  const { movieGateway } = useMoviesDependencies()
  const { hottestMovies, isLoading } = useNowPlayingMovies(movieGateway)

  if (isLoading) {
    return <BannerSkeleton />
  }

  return (
    <BannerCarousel.Root>
      <BannerCarousel.Content>
        {hottestMovies?.map(movie => (
          <BannerCarousel.Item className="h-[80vh] w-full" key={movie.id}>
            <BannerCard movie={movie} />
          </BannerCarousel.Item>
        ))}
      </BannerCarousel.Content>
    </BannerCarousel.Root>
  )
}
