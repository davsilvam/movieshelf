export function BannerSkeleton() {
  return (
    <div className="flex h-[80vh] w-full animate-pulse flex-col justify-between bg-shark/70 px-6 pb-8 pt-20 max-md:pb-16 md:px-10 md:pt-32">
      <div className="z-10 flex flex-col gap-5">
        <div className="h-6 w-40 rounded bg-white/20" />

        <div className="h-12 w-full max-w-[288px] rounded bg-white/20 md:h-20" />

        <div className="h-14 w-20 rounded bg-white/20 md:h-16" />
      </div>

      <div className="h-14 w-36 rounded-lg bg-white/20" />
    </div>
  )
}
