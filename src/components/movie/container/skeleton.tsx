import { MovieCardSkeleton } from '../card-skeleton'

interface MovieContainerSkeletonProps {
  hasTitle?: boolean
  length?: number
}

export function MovieContainerSkeleton({
  hasTitle = false,
  length = 10,
}: MovieContainerSkeletonProps) {
  return (
    <div className="flex w-full flex-col gap-6">
      {hasTitle && (
        <div className="h-10 w-40 animate-pulse rounded bg-white/20" />
      )}

      <div className="grid grid-cols-3 gap-4 md:gap-6 lg:grid-cols-4 lg:gap-10 xl:grid-cols-5">
        {Array.from({ length }).map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}
