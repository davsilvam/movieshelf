import Image from 'next/image'

interface MovieDetailsImageCardProps {
  movieTitle: string
  filePath: string
  type: 'backdrop' | 'poster'
}

export function MovieDetailsImageCard({
  movieTitle,
  filePath,
  type,
}: MovieDetailsImageCardProps) {
  const imageFilePath =
    type === 'backdrop' ? `w780${filePath}` : `w342${filePath}`

  return (
    <Image
      alt={`${movieTitle} backdrop.`}
      src={`https://image.tmdb.org/t/p/${imageFilePath}`}
      className="rounded-lg"
      height={type === 'backdrop' ? 225 : 330}
      width={type === 'backdrop' ? 400 : 220}
      key={imageFilePath + 'w'}
    />
  )
}
