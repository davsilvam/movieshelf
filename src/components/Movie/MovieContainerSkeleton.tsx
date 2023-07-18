export function MovieContainerSkeleton() {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="h-8 w-40 animate-pulse rounded bg-white/20" />

      <div className="grid grid-cols-5 gap-12">
        <div className="h-[330px] w-full animate-pulse rounded-xl bg-shark" />
        <div className="h-[330px] w-full animate-pulse rounded-xl bg-shark" />
        <div className="h-[330px] w-full animate-pulse rounded-xl bg-shark" />
        <div className="h-[330px] w-full animate-pulse rounded-xl bg-shark" />
        <div className="h-[330px] w-full animate-pulse rounded-xl bg-shark" />
        <div className="h-[330px] w-full animate-pulse rounded-xl bg-shark" />
        <div className="h-[330px] w-full animate-pulse rounded-xl bg-shark" />
        <div className="h-[330px] w-full animate-pulse rounded-xl bg-shark" />
        <div className="h-[330px] w-full animate-pulse rounded-xl bg-shark" />
        <div className="h-[330px] w-full animate-pulse rounded-xl bg-shark" />
      </div>
    </div>
  )
}
