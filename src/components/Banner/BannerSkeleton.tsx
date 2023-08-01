export function BannerSkeleton() {
  return (
    <div className="flex h-[80vh] w-full animate-pulse flex-col justify-between bg-shark/70 px-10 py-8 pt-32">
      <div className="z-10 flex flex-col gap-5">
        <div className="h-5 w-40 rounded bg-white/20" />

        <div className="space-y-3">
          <div className="h-20 w-72 rounded bg-white/20" />
          <div className="h-20 w-96 rounded bg-white/20" />
        </div>

        <div className="h-12 w-16 rounded bg-white/20" />
      </div>

      <div className="h-12 w-36 rounded-lg bg-white/20" />
    </div>
  )
}
