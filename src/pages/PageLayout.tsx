import { FC, ReactNode } from 'react'

// components
import { MobileNavbar, Sidebar } from '../components'

// utils
import { GoToTop } from '../utils'

interface PageLayoutProps {
  children: ReactNode
}

export const PageLayout: FC<PageLayoutProps> = ({ children }) => (
  <div className="flex min-h-screen w-full bg-secondary-900 text-secondary-50 max-md:pb-20">
    <Sidebar />
    <MobileNavbar />
    <div className="layout-main relative flex w-full flex-col lg:ml-60">
      {children}
    </div>
    <GoToTop />
  </div>
)
