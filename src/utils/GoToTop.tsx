import { FC, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const GoToTop: FC = () => {
  const routePath = useLocation()

  function onTop() {
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    onTop()
  }, [routePath])

  return null
}
