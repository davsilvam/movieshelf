import { FC } from 'react'

// skeleton
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// utils
import { skeletonBreakpoints } from '../utils'

export const MovieSkeleton: FC = () => (
  <Skeleton
    baseColor="#1b1a27"
    className="h-[148px] w-[96px] rounded-md md:h-[196px] md:w-[142px] xl:h-[240px] xl:w-[160px]"
    containerClassName={`flex ${
      skeletonBreakpoints() < 4
        ? 'gap-[30px]'
        : skeletonBreakpoints() < 5
        ? 'gap-[40px]'
        : 'gap-[45px]'
    }`}
    count={skeletonBreakpoints()}
    highlightColor="#303030"
    inline={true}
  />
)
