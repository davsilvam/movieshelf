import { FC } from 'react'

// Icons
import { StarIcon, UsersIcon } from '@heroicons/react/24/outline'

// Types
import { MovieDetailsType } from '../@types/tmdb'

interface UsersInfoProps {
  details: MovieDetailsType | undefined
}

export const UsersInfo: FC<UsersInfoProps> = ({ details }) => {
  return (
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
}
