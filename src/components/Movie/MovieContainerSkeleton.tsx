interface MovieContainerSkeletonProps {
  hasTitle?: boolean
}

export function MovieContainerSkeleton({
  hasTitle = false,
}: MovieContainerSkeletonProps) {
  return (
    <div className="flex w-full flex-col gap-6">
      {hasTitle && (
        <div className="h-10 w-40 animate-pulse rounded bg-white/20" />
      )}

      <div className="grid grid-cols-3 gap-4 md:gap-6 lg:grid-cols-4 lg:gap-10 xl:grid-cols-5">
        <div className="aspect-[2/3] w-full animate-pulse rounded-xl bg-shark" />
        <div className="aspect-[2/3] w-full animate-pulse rounded-xl bg-shark" />
        <div className="aspect-[2/3] w-full animate-pulse rounded-xl bg-shark" />
        <div className="aspect-[2/3] w-full animate-pulse rounded-xl bg-shark" />
        <div className="aspect-[2/3] w-full animate-pulse rounded-xl bg-shark" />
        <div className="aspect-[2/3] w-full animate-pulse rounded-xl bg-shark" />
        <div className="aspect-[2/3] w-full animate-pulse rounded-xl bg-shark" />
        <div className="aspect-[2/3] w-full animate-pulse rounded-xl bg-shark" />
        <div className="aspect-[2/3] w-full animate-pulse rounded-xl bg-shark" />
        <div className="aspect-[2/3] w-full animate-pulse rounded-xl bg-shark" />
      </div>
    </div>
  )
}
