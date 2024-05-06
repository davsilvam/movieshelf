import Image from 'next/image'

import { ImageOff } from 'lucide-react'

interface MovieDetailsMemberCardProps {
  name: string
  profilePath: string
  character?: string
  job?: string
}

export function MovieDetailsMemberCard({
  name,
  profilePath,
  character,
  job,
}: MovieDetailsMemberCardProps) {
  const member = {
    name,
    profilePath,
    character,
    job,
  }

  return (
    <div className="flex items-center gap-4">
      {member.profilePath ? (
        <Image
          alt={`${member.name} profile picture.`}
          src={`https://image.tmdb.org/t/p/w92${member.profilePath}`}
          className="rounded-lg"
          height={96}
          width={64}
        />
      ) : (
        <div className="flex h-24 w-16 items-center justify-center rounded-lg bg-oslo">
          <ImageOff className="h-5 w-5 text-woodsmoke" />
        </div>
      )}

      <div className="flex flex-col items-start gap-0.5">
        <p className="font-medium text-white">{member.name}</p>
        <p className="text-sm text-oslo">{member.character || member.job}</p>
      </div>
    </div>
  )
}
