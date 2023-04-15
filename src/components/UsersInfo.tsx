import { FC } from 'react'

// icons
import { Star, Users } from '@phosphor-icons/react'

// types
import { MovieDetails } from '../@types/tmdb'

interface UsersInfoProps {
  details: MovieDetails | undefined
}

export const UsersInfo: FC<UsersInfoProps> = ({ details }) => (
  <div className="flex items-center gap-2 font-semibold">
    <Star size={20} className="text-pizazz" />
    <p>{details && (details?.vote_average / 2).toFixed(1)}</p>
    <Users size={20} className="w-5" />

    <hr className="h-4 w-px border border-secondary-100" />

    <p className="text-xs text-secondary-300">
      {details?.vote_count.toLocaleString()} Avaliações
    </p>
  </div>
)
