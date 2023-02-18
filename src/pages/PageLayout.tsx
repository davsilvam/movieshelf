import { FC } from 'react'

// Components
import { MobileNavbar, Sidebar } from '../components/exports'

// Utils
import { GoToTop } from '../utils/GoToTop'

interface PageLayoutProps {
  children: React.ReactNode
}

export const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full bg-secondary-900 text-secondary-50 max-md:pb-20">
      <Sidebar />
      <MobileNavbar />

      <div className="relative flex w-full flex-col lg:ml-[20%] lg:max-w-[80%] xl:ml-[16%] xl:max-w-[84%]">
        {children}
      </div>
      <GoToTop />
    </div>
  )
}
