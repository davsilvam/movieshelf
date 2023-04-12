import { FC } from 'react'

// icons
import { StarIcon, UsersIcon } from '@heroicons/react/24/outline'

// types
import { MovieDetails } from '../@types/tmdb'

interface UsersInfoProps {
  details: MovieDetails | undefined
}

export const UsersInfo: FC<UsersInfoProps> = ({ details }) => (
  <h4 className="flex items-center gap-2 font-semibold">
    <StarIcon className="w-5 text-pizazz" />{' '}
    {details && (details?.vote_average / 2).toFixed(1)}{' '}
    <UsersIcon className="w-5" />
    <div className="h-4 w-px bg-secondary-50"></div>
    <span className="text-xs text-secondary-300">
      {details?.vote_count.toLocaleString()} Avaliações
    </span>
  </h4>
)
